import Sequencer from "./Sequencer";
import Arranger from "./Arranger";

import NumericParameter from "./Parameter/NumericParameter";

import { Note } from "@tonaljs/tonal";

import RootStore from "./Root.store";
import BaseSynthesizer from "./Synthesizer/SynthesizerTypes/Base";
import BaseParameter from "./Parameter/Base";
import NumericEnumParameter from "./Parameter/NumericEnumParameter";
import StringEnumParameter from "./Parameter/StringEnumParameter";
import StringEnumArrayParameter from "./Parameter/StringEnumArrayParameter";
import NumericArrayParameter from "./Parameter/NumericArrayParameter";
/*
 * Defines Parameters not associated with a plugin.
 */

interface IHash {
  [details: string]: (trackNumber: number) => BaseParameter;
}
export default class ParameterStore {
  parameters: IHash = {
    pitch: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Pitch",
        key: this.parameterKey("pitch", trackNumber),
        default: Note.midi("C2")!,
      });
    },
    trigger_set: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Trigger Set", //  chosenTriggerParameterSet
        key: this.parameterKey("trigger_set", trackNumber),
        default: Note.midi("C2")!,
        // fieldOptions: {
        //   min: 0,
        //   max: this.triggerWhen?.parameterSets.length! - 1,
        //   step: 1,
        //   current: this.chosenGateParameterSet,
        // },
      });
    },
    gate_set: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Gate Set", // chosenGateParameterSet
        key: this.parameterKey("gate_set", trackNumber),
        default: Note.midi("C2")!,
        // fieldOptions: {
        //   min: 0,
        //   max: this.triggerWhen?.parameterSets.length! - 1,
        //   step: 1,
        //   current: this.chosenGateParameterSet,
        // },
      });
    },
    min_gate: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Min Gate", // chosenGateParameterSet
        key: this.parameterKey("min_gate", trackNumber),
        default: Note.midi("C2")!,
        //  fieldOptions: {
        //   min: 10,
        //   max: 60,
        //   step: 1,
        //   current: this.minGate,
        // },
      });
    },
    max_gate: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Max Gate", // chosenGateParameterSet
        key: this.parameterKey("max_gate", trackNumber),
        default: Note.midi("C2")!,
        // fieldOptions: {
        // min: 10,
        // max: 300,
        // step: 1,
        // current: this.maxGate,
        // },
      });
    },
    min_interval: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Minimum Interval", // chosenGateParameterSet
        key: this.parameterKey("min_interval", trackNumber),
        default: Note.midi("C2")!,
        // fieldOptions: {
        // min: 0,
        // max: 100,
        // current: this.minInterval,
        // },
      });
    },
    max_interval: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Max Interval", // chosenGateParameterSet
        key: this.parameterKey("max_interval", trackNumber),
        default: Note.midi("C2")!,
        // fieldOptions: {
        /* It's a slider. */
        // min: 0,
        // max: 100,
        // current: this.minInterval,
        // },
      });
    },
    selected_fill: (trackNumber: number) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Selected Fill", // chosenGateParameterSet
        key: this.parameterKey("selected_fill", trackNumber),
        default: Note.midi("C2")!,
        // fieldOptions: {
        /* It's a slider. */
        // min: 0,
        // max: fill list length,
        // },
      });
    },
    step_interval: (trackNumber: number) => {
      return new NumericEnumParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Interval", // chosenGateParameterSet
        key: this.parameterKey("step_interval", trackNumber),
        options: [1, 2, 3, 4, 6, 8, 12, 16],
        default: 4,
        // fieldOptions: {
        /* It's a slider. */
        // min: 0,
        // max: fill list length,
        // },
      });
    },
    arpeggiator_type: (trackNumber: number) => {
      return new StringEnumParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Arpeggiator Type", // chosenGateParameterSet
        key: this.parameterKey("arpeggiator_type", trackNumber),
        options: ["up", "down", "updown", "downup", "random"],
        default: "up",
      });
    },
    step_pitch_shift: (trackNumber: number) => {
      return new /* It's a parameter that has an array of numbers. */
      NumericArrayParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Pitch Shift",
        key: this.parameterKey("step_pitch_shift", trackNumber),
        default: [0, 0, 0, 0, 0, 0, 0, 0],
        min: 0,
        max: 36,
      });
    },
    step_gate_array: (trackNumber: number) => {
      return new NumericArrayParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Gate Array",
        key: this.parameterKey("step_gate_array", trackNumber),
        default: [0, 0, 0, 0, 0, 0, 0, 0],
        min: 0,
        max: 1,
      });
    },
    step_pitch_shift_direction: (trackNumber: number) => {
      return new StringEnumArrayParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Pitch Shift Direction",
        key: this.parameterKey("step_pitch_shift_direction", trackNumber),
        options: ["up", "down", "either", "none"],
        default: [
          "either",
          "either",
          "either",
          "either",
          "either",
          "either",
          "either",
          "either",
        ],
      });
    },
  };

  constructor(public rootStore: RootStore | undefined) {}

  parameterKey(parameterName: string, trackNumber: number): string {
    return `track.${trackNumber}.synthesizer.${parameterName}`;
  }

  fetchForSynth(
    _synth: BaseSynthesizer,
    _trackNumber: number
  ): BaseParameter[] {
    return [];
  }

  makeParameterList(sequencer: Sequencer): string[] {
    let retVal: string[] = [];
    retVal = retVal.concat(sequencer?.parameters!);

    if (sequencer.type === "step") {
      retVal.push("trigger_set");
      retVal.push("gate_set");
    }

    if (sequencer.type === "arpeggiator") {
      retVal.push("arpeggiator_type");
    }

    if (sequencer.type === "drone" || sequencer.type === "randomStep") {
      retVal.push("min_gate");
      retVal.push("max_gate");
      retVal.push("min_interval");
      retVal.push("max_interval");
    }

    if (sequencer.type === "fixedStep") {
      retVal.push("step_pitch_shift");
      retVal.push("step_pitch_shift_direction");
      retVal.push("step_gate_array");
    }

    if (
      sequencer.triggerWhen.parameterSets[0]?.triggerType === "stepInterval"
    ) {
      retVal.push("step_interval");
    }

    if (
      sequencer?.triggerWhen?.parameterSets[0]?.fillList &&
      sequencer?.triggerWhen?.parameterSets[0]?.fillList.length > 0
    ) {
      retVal.push("selected_fill");
    }
    return retVal.filter((parameter: string | undefined) => {
      return parameter !== undefined;
    });
  }

  fetchForSequencer(
    sequencer: Sequencer,
    trackNumber: number
  ): BaseParameter[] {
    let parametersToGet = this.makeParameterList(sequencer);

    console.log(parametersToGet);
    let parameters = parametersToGet.map((parameter: string) => {
      return this.parameters[parameter]!(trackNumber);
    });
    return parameters!;
  }

  fetchForArranger(arranger: Arranger): BaseParameter[] {
    console.log(arranger);
    return [];
  }
}
