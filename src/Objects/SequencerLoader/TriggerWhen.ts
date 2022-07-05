import { debug, info } from "../../Util/logger.ts";

export interface ITriggerParameters {
  triggerType: "stepList" | "stepInterval";
  stepInterval?: number;
  on?: number;
  stepList?: number[];
}

export default class TriggerWhen {
  type: "everyX" | "stepArray" = "everyX";
  parameterSets: TriggerParameters[] = [];

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
  parse(line: string) {
    let trimmedLine = this.trim(line);
    if (!trimmedLine) {
      return;
    }

    switch (trimmedLine) {
      case trimmedLine.match(/every [0-9]{1,2} steps on [0-9]+/)?.input:
        this.type = "everyX";
        var rx = /every ([0-9]{1,2}) steps on ([0-9]+)/;
        var arr = rx.exec(trimmedLine);

        if (arr && arr[1] && arr[2]) {
          this.parameterSets[0] = {
            triggerType: "stepInterval",
            stepInterval: parseInt(arr[1]),
            on: parseInt(arr[2]),
          };
        }
        break;

      case trimmedLine.match(/every [0-9]{1,2} steps/)?.input:
        this.type = "everyX";
        var rx = /every ([0-9]{1,2}) steps/;
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
      type: this.type,
      parameters: this.parameters,
    });
  }
}
