export default class TriggerWhen {
    type: "everyX" | "stepArray" = "everyX";
    parameters: number = 1; 

    parse(line: string) {
        const trimmedLine = line.trimStart().trimEnd();
        console.log("Parsing TriggerWhen");
        console.log(trimmedLine);
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
                console.log(trimmedLine);
                var arr = rx.exec(trimmedLine);
                this.type = "everyX";
                console.log(arr);
                if (arr && arr[1]) {
                    this.parameters = parseInt(arr[1]);
                }
                break;                
        }

        console.log(`TriggerWhen Parsed ${this.type} ${this.parameters}`);
    }
}
