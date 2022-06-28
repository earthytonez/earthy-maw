import { debug, info } from '../../Util/logger.ts';

export default class TriggerWhen {
    type: "everyX" | "stepArray" = "everyX";
    parameters: any = {
        steps: 1,
        on: 1
    } 

    parse(line: string) {
        const trimmedLine = line.trimStart().trimEnd();
        info("TRIGGER_WHEN", "Parsing TriggerWhen", { trimmedLine });
        if (!trimmedLine) {
            return;
        }


        switch(trimmedLine) {
            case "every step":
                this.type = "everyX";
                this.parameters = {
                    steps: 1,
                    on: 1
                }
                break;
            case trimmedLine.match(/every [0-9]{1,2} steps/)!.input:
                this.type = "everyX";
                var rx = /every ([0-9]{1,2}) steps/;
                var arr = rx.exec(trimmedLine);
                if (arr && arr[1]) {
                    this.parameters = {
                        steps: parseInt(arr[1]),
                        on: 1
                    }
                }
                break;                
    
            case trimmedLine.match(/every [0-9]{1,2} steps on [0-9]+/)!.input:
                this.type = "everyX";
                var rx = /every ([0-9]{1,2}) steps on ([0-9]+)/;
                var arr = rx.exec(trimmedLine);

                if (arr && arr[1] && arr[2]) {
                    this.parameters = {
                        steps: parseInt(arr[1]),
                        on: parseInt(arr[1])
                    }
                }
                break;                
        }

        debug(`TRIGGER_WHEN`, "parsed", { type: this.type, parameters: this.parameters });
    }
}
