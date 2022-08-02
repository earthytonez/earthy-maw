import { debug, info } from "../../../Util/logger";

export interface ITriggerParameters {
  triggerType: "stepList" | "stepInterval" | "random";
  stepInterval?: number;
  on?: number;
  stepList?: number[];

  // random parameters
  octaves: number
  minSkip: number
  maxSkip: number
}

export default class TriggerWhen {
  type: "random" | "everyX" | "stepArray" = "everyX";
  parameterSets: ITriggerParameters[] = [];

  trim(line: string): string {
    const trimmedLine = line.trimStart().trimEnd();
    info("TRIGGER_WHEN", "Parsing TriggerWhen", { trimmedLine });
    return trimmedLine;
  }

  /* Adds to parameterSets */
  parseList(line: string) {
    let trimmedLine = this.trim(line);
    if (trimmedLine.startsWith("[") && trimmedLine.endsWith("]")) {
      this.parameterSets.push({
        triggerType: "stepList",
        stepList: JSON.parse(trimmedLine),
      });
    }

    info("TRIGGER_WHEN", "Parsed List with parameter sets", this.parameterSets);
  }

  /* Resets parameterSets */
  parse(line: any) {
    if (!line) {
      return;
    }
    const trimmedLine = this.trim(line.trigger);

    if (!trimmedLine) return;

    console.log(`TRIMMED_LINE: ${trimmedLine}`)

    switch (trimmedLine) {
      case trimmedLine.match(/Rand\(\)/)?.input:
        console.log("TRIGGER_WHEN MATCHED TRIMMED_LINE")
        this.type = "random"
        this.parameterSets[0] = {
          triggerType: "random",
          octaves: 1,
          minSkip: 0,
          maxSkip: 64,
        }
        break;
      case trimmedLine.match(/every \d{1,2} steps on \d+/)?.input:
        this.type = "everyX";
        var rx = /every (\d{1,2}) steps on (\d+)/;
        var arr = rx.exec(trimmedLine);

        if (arr && arr[1] && arr[2]) {
          this.parameterSets[0] = {
            triggerType: "stepInterval",
            stepInterval: parseInt(arr[1]),
            on: parseInt(arr[2]),
          };
        }
        break;

      case trimmedLine.match(/every \d{1,2} steps/)?.input:
        this.type = "everyX";
        var rx = /every (\d{1,2}) steps/;
        var arr = rx.exec(trimmedLine);
        if (arr && arr[1]) {
          this.parameterSets[0] = {
            triggerType: "stepInterval",
            stepInterval: parseInt(arr[1]),
            on: 0,
          };
        }
        break;

      case "every step":
        this.type = "everyX";
        this.parameterSets[0] = {
          triggerType: "stepInterval",
          stepInterval: 1,
          on: 0,
        };
        break;
    }

    debug(`TRIGGER_WHEN`, "parsed", {
      trigger: line.trigger,
      type: this.type,
      parameters: this.parameterSets[0],
    });
  }
}
