import { debug, info } from "../../../Util/logger";

export interface ITriggerParameters {
  triggerType: "stepList" | "stepInterval" | "random";
  stepInterval?: number;
  on?: number;
  stepList?: number[];
  gateList?: number[];
  // random parameters
  octaves?: number;
  minSkip?: number;
  maxSkip?: number;
  fillStart?: number;
  fillEnd?: number;
  fillList?: number[][];

  // From TOML
  fillWhen?: string;
}

/**
 * TriggerWhen determines when a trigger/gate will happen.
 *
 * Types:
 * random
 * everyX:   trigger on an interval - every beat, every 4 beats, etc.
 * stepArray
 *
 * @date 2022-08-14
 * @param {any} line:string
 * @returns {any}
 */
export default class TriggerWhen {
  type: "random" | "everyX" | "stepArray" = "everyX";
  parameterSets: ITriggerParameters[] = [];
  fills?: any[];
  fillStart: number = -1;
  fillEnd: number = -1;
  fillWhen?: string;
  fillList?: number[][];

  /* _trim is a utility function to return a trimmed string */
  _trim(line: string): string {
    return line.trimStart().trimEnd();
  }

  /* Adds to parameterSets */
  parseList(lists: number[][]) {
    this.parameterSets = lists.map((list: any) => {
      return {
        triggerType: "stepList",
        stepList: list,
      };
    });
    info("TRIGGER_WHEN", "Parsed List with parameter sets", this.parameterSets);
  }

  parseFillList(lists: number[][]) {
    this.parameterSets[0]!.fillList = lists;
    info("TRIGGER_WHEN", "Parsed List with parameter sets", this.parameterSets);
  }

  parseFill(fill: string) {
    if (fill.endsWith("sixteen")) {
      this.parameterSets[0]!.fillEnd = 16;
    }

    if (fill.startsWith("last four")) {
      this.parameterSets[0]!.fillStart = 13;
    } else if (fill.startsWith("last eight")) {
      this.parameterSets[0]!.fillStart = 9;
    }

    if (fill === "last 16 of 64") {
      this.parameterSets[0]!.fillStart = 48;
      this.parameterSets[0]!.fillEnd = 64;
    }
  }

  /* Resets parameterSets */
  parse(line: any) {
    if (!line) {
      return;
    }
    const trimmedLine = this._trim(line.trigger);
    if (!trimmedLine) return;

    switch (trimmedLine) {
      case trimmedLine.match(/Rand\(\)/)?.input:
        console.log("TRIGGER_WHEN MATCHED TRIMMED_LINE");
        this.type = "random";
        this.parameterSets[0] = {
          triggerType: "random",
          octaves: 1,
          minSkip: 0,
          maxSkip: 64,
        };
        break;
      case trimmedLine.match(/every \d{1,2} steps on \d+/)?.input:
        this.type = "everyX";
        const rxa = /every (\d{1,2}) steps on (\d+)/;
        const arra = rxa.exec(trimmedLine);

        if (arra && arra[1] && arra[2]) {
          this.parameterSets[0] = {
            triggerType: "stepInterval",
            stepInterval: parseInt(arra[1]),
            on: parseInt(arra[2]),
          };
        }
        break;

      case trimmedLine.match(/every \d{1,2} steps/)?.input:
        this.type = "everyX";
        const rxb = /every (\d{1,2}) steps/;
        const arrb = rxb.exec(trimmedLine);
        if (arrb && arrb[1]) {
          this.parameterSets[0] = {
            triggerType: "stepInterval",
            stepInterval: parseInt(arrb[1]),
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
