import { info } from "../../../Util/logger";

export interface IGateParameters {
  triggerType: "stepList";
  gateList?: number[];
}

export default class GateLengths {
  type: "random" | "everyX" | "stepArray" = "everyX";
  parameterSets: IGateParameters[] = [];

  trim(line: string): string {
    const trimmedLine = line.trimStart().trimEnd();
    return trimmedLine;
  }

  /* Adds to parameterSets */
  parseList(lists: number[][]) {
    
    lists.forEach((list: number[]) => {
      this.parameterSets.push({
        triggerType: "stepList",
        gateList: list,
      });
    });
    info("TRIGGER_WHEN", "Parsed List with gate parameter sets", this.parameterSets);
  }

  /* Resets parameterSets */
  parse(line: any) {
    console.log(line);
  }
}
