import * as Tone from "tone";
import { Note } from "@tonaljs/tonal";

import BasePlugin, { IPluginNode } from "./Base";
import StringEnumParameter from "../Parameter/StringEnumParameter";
import NumericParameter from "../Parameter/NumericParameter";
import UserParameterStore from "../../stores/UserParameter.store";
import BaseParameter from "stores/Parameter/Base";

export default class FilterPlugin extends BasePlugin {
  _node: IPluginNode;
  public name: string = "Filter";
  public slug: string = "filter";
  filterType: "highpass" | "lowpass";

  constructor(
    trackID: string,
    userParameterStore: UserParameterStore,
    options: any
  ) {
    super(trackID, userParameterStore, options);

    this.filterType = options.subType || "highpass";

    this._node = {
      ToneJSNode: new Tone.Filter(
        this.parameters.get("frequency")?.val,
        this.parameters.get("filter_type")?.val
      ),
    };
  }

  parameterKey(parameterName: string): string {
    return `track.${this._trackID}.synthesizer.${this.slug}.${parameterName}`;
  }

  get parameters(): Map<string, BaseParameter> {
    let defaultFrequency = Note.midi("C6");
    let parameterMap = new Map<string, BaseParameter>();
    parameterMap.set(
      "filter_type",
      new StringEnumParameter({
        userParameterStore: this._userParameterStore,
        name: "Filter Type",
        key: this.parameterKey("filter_type"),
        options: [
          "lowpass",
          "highpass",
          "bandpass",
          "lowshelf",
          "highshelf",
          "notch",
          "allpass",
          "peaking",
        ],
        default: "lowpass",
        plugin: "Filter",
        description: "type of filter",
      })
    );
    parameterMap.set(
      "frequency",
      new NumericParameter({
        userParameterStore: this._userParameterStore,
        name: "Frequency",
        key: this.parameterKey("frequency"),
        default: defaultFrequency!,
        plugin: "Filter",
        description: "frequency at which the filter takes effect",
        min: 0,
        max: 20000,
      })
    );

    return parameterMap;
  }

  node() {
    return this._node;
  }
}
