import { debug, info } from '../../Util/logger.ts';

export default class TriggerWhen {
    type: "everyX" | "stepArray" = "everyX";
    parameters: number = 1; 

    parse(line: string) {
        const trimmedLine = line.trimStart().trimEnd();
        info("TRIGGER_WHEN", "Parsing TriggerWhen", { trimmedLine });
        if (!trimmedLine) {
            return;
        }


        switch(trimmedLine) {
            case "every step":
                this.type = "everyX";
                this.parameters = 1;
                break;
            case trimmedLine.match(/every [0-9]{1,2} steps/)!.input:
                var rx = /every ([0-9]{1,2}) steps/;
                var arr = rx.exec(trimmedLine);
                this.type = "everyX";
                if (arr && arr[1]) {
                    this.parameters = parseInt(arr[1]);
                }
                break;                
        }

        debug(`TRIGGER_WHEN`, "parsed", { type: this.type, parameters: this.parameters });
    }
}
