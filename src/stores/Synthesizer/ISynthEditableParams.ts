import IOscillatorType from "./IOscillatorType";

import { ParameterFieldTypes } from "stores/Parameter/Base";

export default interface ISynthEditableParams {
  name: string;
  field?: string;
  fieldType?: ParameterFieldTypes;
  fieldOptions?: {
    max?: number;
    min?: number;
    // current: number | string;
    options?: Array<number | string>;
  };
}

const OSCILLATOR_TYPES: IOscillatorType[] = [
  "sine",
  "square",
  "triangle",
  "sawtooth",
];

const OSCILLATOR_TYPE_SYNTH_PARAM = function (current: IOscillatorType) {
  return {
    name: "Oscillator Type",
    field: "oscillatorType",
    fieldType: "radio",
    fieldOptions: {
      options: OSCILLATOR_TYPES,
      current: current,
    },
  } as ISynthEditableParams;
};

const PITCH_SYNTH_PARAM = function (current: number) {
  return {
    name: "Pitch",
    field: "pitch",
    fieldType: "slider",
    fieldOptions: {
      min: 0,
      max: 48,
      current: current,
    },
  } as ISynthEditableParams;
};

export { OSCILLATOR_TYPE_SYNTH_PARAM, PITCH_SYNTH_PARAM, OSCILLATOR_TYPES };
