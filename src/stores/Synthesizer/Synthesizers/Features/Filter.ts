import ISynthesizerEditableParams from "../../ISynthEditableParams";
import { Filter } from "tone";

// type Constructor<T> = new (...args: any[]) => T;

export default class FilterFeature {
  cutoff: number = 10000;
  resonance: number = 0;
  filter: Filter = new Filter(this.cutoff, "lowpass");

  get _editParameters(): ISynthesizerEditableParams[] {
    return [
      {
        name: "Filter Cutoff",
        field: "filter.cutoff",
        fieldType: "dial",
        fieldOptions: {
          max: 100,
          min: 0,
          // current: this.cutoff
        },
      },
      {
        name: "Filter Resonance",
        field: "filter.resonance",
        fieldType: "dial",
        fieldOptions: {
          max: 100,
          min: 0,
          // current: this.resonance
        },
      },
    ];
  }
}
