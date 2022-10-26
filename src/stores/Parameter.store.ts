import Arranger from "./Arranger";

import NumericParameter from "./Parameter/NumericParameter";

import { Note } from "@tonaljs/tonal";

import RootStore from "./Root.store";
import { SynthesizerDefinition } from "./Synthesizer/SynthLoader/SynthLoader";
import BaseParameter from "./Parameter/Base";
import NumericEnumParameter from "./Parameter/NumericEnumParameter";
import StringEnumParameter from "./Parameter/StringEnumParameter";
import StringEnumArrayParameter from "./Parameter/StringEnumArrayParameter";
import NumericArrayParameter from "./Parameter/NumericArrayParameter";
import {
  MIDI_NOTE_RANGE_MAX,
  MIDI_NOTE_RANGE_MIN,
} from "config/constants/parameters";
import SequencerDefinition from "./Sequencer/SequencerLoader/SequencerDefinition";
/*
 * Defines Parameters not associated with a plugin.
 */

interface IHash {
  [details: string]: (
    trackID: string,
    options: { [key: string]: number | string }
  ) => BaseParameter;
}

interface ParameterSlug {
  Slug: string;
  Options: { [option: string]: string | number };
}

// interface IMachineDefinition {
//   parameters?: string[];
//   type: string;
// }

export default class ParameterStore {
  parameters: IHash = {
    pitch: (trackID: string, _options: { [key: string]: number | string }) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Pitch",
        key: this.parameterKey("pitch", trackID),
        default: Note.midi("C2")!,
        min: MIDI_NOTE_RANGE_MIN,
        max: MIDI_NOTE_RANGE_MAX,
        description:
          "The pitch of the sound, often for single pitch instruments (Kick Drum)",
      });
    },
    synthesizer_pitch: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Synthesizer Pitch",
        key: this.parameterKey("synthesizer_pitch", trackID),
        default: 0,
        min: -36,
        max: 36,
        description:
          "The pitch of the sound, often for single pitch instruments (Kick Drum)",
      });
    },

    pitch_decay: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Pitch Decay",
        key: this.parameterKey("pitch_decay", trackID),
        default: 0,
        min: 0,
        max: 0.5,
        description: "The amount of time the frequency envelope takes",
      });
    },

    // trigger_set: (
    //   trackID: string,
    //   _options: { [key: string]: number | string }
    // ) => {
    //   return new NumericParameter({
    //     userParameterStore: this.rootStore!.userParameterStore,
    //     name: "Trigger Set", //  chosenTriggerParameterSet
    //     key: this.parameterKey("trigger_set", trackID),
    //     default: Note.midi("C2")!,
    //     // fieldOptions: {
    //     //   min: 0,
    //     //   max: this.triggerWhen?.parameterSets.length! - 1,
    //     //   step: 1,
    //     //   current: this.chosenGateParameterSet,
    //     // },
    //   });
    // },
    // gate_set: (
    //   trackID: string,
    //   _options: { [key: string]: number | string }
    // ) => {
    //   return new NumericParameter({
    //     userParameterStore: this.rootStore!.userParameterStore,
    //     name: "Gate Set", // chosenGateParameterSet
    //     key: this.parameterKey("gate_set", trackID),
    //     default: Note.midi("C2")!,
    //     // fieldOptions: {
    //     //   min: 0,
    //     //   max: this.triggerWhen?.parameterSets.length! - 1,
    //     //   step: 1,
    //     //   current: this.chosenGateParameterSet,
    //     // },
    //   });
    // },
    min_gate: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Min Gate", // chosenGateParameterSet
        key: this.parameterKey("min_gate", trackID),
        default: Note.midi("C2")!,
        min: 0,
        max: 100,
        description:
          "For random sequencers, the minimum 'gate' or length of a note.",
      });
    },
    max_gate: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Max Gate", // chosenGateParameterSet
        key: this.parameterKey("max_gate", trackID),
        default: Note.midi("C2")!,
        min: 0,
        max: 100,
        description:
          "For random sequencers, the maximum 'gate' or length of a note.",
      });
    },
    min_interval: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Minimum Interval", // chosenGateParameterSet
        key: this.parameterKey("min_interval", trackID),
        default: Note.midi("C2")!,
        min: 0,
        max: 100,
        description:
          "In a random sequencer the minimum amount of time between notes.",
      });
    },
    max_interval: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Max Interval", // chosenGateParameterSet
        key: this.parameterKey("max_interval", trackID),
        default: Note.midi("C2")!,
        min: 0,
        max: 100,
        description:
          "In a random sequencer the maximum amount of time between notes.",
      });
    },
    selected_fill: (
      trackID: string,
      options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Selected Fill", // chosenGateParameterSet
        key: this.parameterKey("selected_fill", trackID),
        default: 0,
        min: options.min as number,
        max: options.max as number,
        description: "Which fill is used by the sequencer.",
      });
    },
    step_interval: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericEnumParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Interval", // chosenGateParameterSet
        key: this.parameterKey("step_interval", trackID),
        options: [1, 2, 3, 4, 6, 8, 12, 16],
        default: 4,
        description:
          "The relative speed of the step sequencer.  A Step interval of '4' means that a note will play every 4 ticks of the step sequencer",
        // fieldOptions: {
        /* It's a slider. */
        // min: 0,
        // max: fill list length,
        // },
      });
    },
    arpeggiator_type: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new StringEnumParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Arpeggiator Type", // chosenGateParameterSet
        key: this.parameterKey("arpeggiator_type", trackID),
        options: ["up", "down", "updown", "downup", "random"],
        default: "up",
        description: "description",
      });
    },
    step_pitch_shift: (
      trackID: string,
      options: { [key: string]: number | string }
    ) => {
      return new /* It's a parameter that has an array of numbers. */
      NumericArrayParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Pitch Shift",
        key: this.parameterKey("step_pitch_shift", trackID),
        default: [0, 0, 0, 0, 0, 0, 0, 0],
        min: options.min as number,
        max: options.max as number,
        description:
          "The number of steps to move up or down in pitch, for interval step sequencers.",
      });
    },
    step_gate_array: (
      trackID: string,
      options: { [key: string]: number | string }
    ) => {
      return new NumericArrayParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Gate Array",
        key: this.parameterKey("step_gate_array", trackID),
        default: [0, 0, 0, 0, 0, 0, 0, 0],
        min: options.min as number,
        max: options.max as number,
        description: "The length of a note for fixed-length step sequencers",
      });
    },
    step_pitch_shift_direction: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new StringEnumArrayParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Step Pitch Shift Direction",
        key: this.parameterKey("step_pitch_shift_direction", trackID),
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
        description:
          "In an interval step sequencer, which direction the current interval should go.",
      });
    },
    beat_repeat: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Beat Repeast", // chosenGateParameterSet
        key: this.parameterKey("beat_repeat", trackID),
        default: 0,
        min: 0,
        max: 3,
        description: "How many times will note be repeated.",
      });
    },
    beat_offset: (
      trackID: string,
      _options: { [key: string]: number | string }
    ) => {
      return new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Beat Offset", // chosenGateParameterSet
        key: this.parameterKey("beat_offset", trackID),
        default: 1,
        min: 0,
        max: 3,
        description: "When will note be played after downbeat.",
      });
    },
  };

  constructor(public rootStore: RootStore | undefined) {}

  parameterKey(parameterName: string, trackID: string): string {
    return `track.${trackID}.synthesizer.${parameterName}`;
  }

  makeSequencerParameterList(sequencer: SequencerDefinition): ParameterSlug[] {
    let retVal: ParameterSlug[] = [];

    if (sequencer.parameters) {
      retVal = retVal.concat(
        sequencer.parameters.map((parameter: string) => {
          return { Slug: parameter, Options: {} };
        })
      );
    }

    // if (sequencer.type === "step") {
    //   retVal.push({ Slug: "trigger_set", Options: {} });
    //   retVal.push({ Slug: "gate_set", Options: {} });
    // }

    if (sequencer.type === "arpeggiator") {
      retVal.push({ Slug: "arpeggiator_type", Options: {} });
    }

    if (sequencer.type === "drone" || sequencer.type === "randomStep") {
      retVal.push({ Slug: "min_gate", Options: {} });
      retVal.push({ Slug: "max_gate", Options: {} });
      retVal.push({ Slug: "min_interval", Options: {} });
      retVal.push({ Slug: "max_interval", Options: {} });
    }

    if (sequencer.type === "fixedStep") {
      retVal.push({ Slug: "step_pitch_shift", Options: {} });
      retVal.push({ Slug: "step_pitch_shift_direction", Options: {} });
      retVal.push({ Slug: "step_gate_array", Options: {} });
    }

    if (
      sequencer.triggerWhen.parameterSets[0]?.triggerType === "stepInterval"
    ) {
      retVal.push({ Slug: "step_interval", Options: {} });
    }

    if (
      sequencer?.triggerWhen?.parameterSets[0]?.fillList &&
      sequencer?.triggerWhen?.parameterSets[0]?.fillList.length > 0
    ) {
      retVal.push({
        Slug: "selected_fill",
        Options: {
          min: 0,
          max: sequencer?.triggerWhen?.parameterSets[0]?.fillList.length,
        },
      });
    }
    return retVal.filter((parameter: ParameterSlug | undefined) => {
      return parameter !== undefined;
    });
  }

  makeSynthParameterList(synthesizer: SynthesizerDefinition): ParameterSlug[] {
    let retVal: ParameterSlug[] = [];

    if (synthesizer.parameters) {
      retVal = retVal.concat(
        synthesizer.parameters.map((parameter: string) => {
          return { Slug: parameter, Options: {} };
        })
      );
    }
    return retVal.filter((parameter: ParameterSlug | undefined) => {
      return parameter !== undefined;
    });
  }

  fetchForSequencer(
    sequencer: SequencerDefinition,
    trackID: string
  ): BaseParameter[] {
    let parametersToGet = this.makeSequencerParameterList(sequencer);

    let parameters = parametersToGet.map((parameter: ParameterSlug) => {
      return this.parameters[parameter.Slug]!(trackID, parameter.Options);
    });
    return parameters!;
  }

  fetchForSynth(
    synthesizer: SynthesizerDefinition,
    trackID: string
  ): BaseParameter[] {
    let parametersToGet = this.makeSynthParameterList(synthesizer);

    let parameters = parametersToGet.map((parameter: ParameterSlug) => {
      return this.parameters[parameter.Slug]!(trackID, parameter.Options);
    });
    return parameters!;
  }

  fetchForArranger(arranger: Arranger): BaseParameter[] {
    console.log(arranger);
    return [];
  }
}
