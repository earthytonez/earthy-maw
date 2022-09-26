import * as Tone from "tone";

import BasePlugin, { IPluginNode} from './Base';
import UserParameterStore from "../../stores/UserParameter.store";
import BaseParameter from "stores/Parameter/Base";
import NumericParameter from "stores/Parameter/NumericParameter";

const DEFAULT_DELAY_TIME = 0.25;
const DEFAULT_FEEDBACK = 1;

export default class FilterPlugin extends BasePlugin {
    _node: IPluginNode;
    public name: string = "Filter";
    public slug: string = "filter";
    delayType: "feedback" | "pingpong";

    constructor(trackNumber: number, userParameterStore: UserParameterStore, options: any) {
        super(trackNumber, userParameterStore, options);
        
        this.delayType = options.subType || "feedback"
        
        if (this.delayType == "feedback") {
            this._node = {
                ToneJSNode: new Tone.FeedbackDelay(DEFAULT_DELAY_TIME, DEFAULT_FEEDBACK),
            }    
        } else {
            this._node = {
                ToneJSNode: new Tone.PingPongDelay(DEFAULT_DELAY_TIME, DEFAULT_FEEDBACK),
            }    
        }
    }

    parameterKey(parameterName: string): string {
        return `track.${this._trackNumber}.synthesizer.${this.slug}.${parameterName}`
    }


    get parameters(): BaseParameter[] {
        return [
            new NumericParameter({
                userParameterStore: this._userParameterStore,
                name: "Delay Time",
                key: this.parameterKey("delay_time"),
                default: DEFAULT_DELAY_TIME!,
                plugin: "Filter",
              }),
              new NumericParameter({
                userParameterStore: this._userParameterStore,
                name: "Feedback",
                key: this.parameterKey("feedback"),
                default: DEFAULT_FEEDBACK!,
                plugin: "Filter",
              })
        ];     
    }

    node() {
        return this._node;
    }

}