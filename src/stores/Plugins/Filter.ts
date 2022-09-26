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
    trackNumber: number,
    userParameterStore: UserParameterStore,
    options: any
  ) {
    super(trackNumber, userParameterStore, options);

    this.filterType = options.subType || "highpass";

    this._node = {
      ToneJSNode: new Tone.Filter(1500, this.filterType),
    };
  }

  parameterKey(parameterName: string): string {
    return `track.${this._trackNumber}.synthesizer.${this.slug}.${parameterName}`;
  }

  get parameters(): BaseParameter[] {
    let defaultFrequency = Note.midi("C6");
    return [
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
      }),
      new NumericParameter({
        userParameterStore: this._userParameterStore,
        name: "Frequency",
        key: this.parameterKey("frequency"),
        default: defaultFrequency!,
        plugin: "Filter",
      }),
    ];
  }

  node() {
    return this._node;
  }
}
