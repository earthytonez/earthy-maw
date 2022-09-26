import Sequencer from "./Sequencer";
import Arranger from "./Arranger";

import NumericParameter from "./Parameter/NumericParameter";

import { Note } from "@tonaljs/tonal";

import RootStore from "./Root.store";
import BaseSynthesizer from "./Synthesizer/SynthesizerTypes/Base";
import BaseParameter from "./Parameter/Base";
/*
 * Defines Parameters not associated with a plugin.
 */
export default class ParameterStore {
  constructor(public rootStore: RootStore | undefined) {}

  parameterKey(parameterName: string, trackNumber: number): string {
    return `track.${trackNumber}.synthesizer.${parameterName}`;
  }

  fetchForSynth(_synth: BaseSynthesizer, trackNumber: number): BaseParameter[] {
    return [
    new NumericParameter({
        userParameterStore: this.rootStore!.userParameterStore,
        name: "Pitch",
        key: this.parameterKey("pitch", trackNumber),
        default: Note.midi("C2")!,
      }),
    ];
  }

  fetchForSequencer(sequencer: Sequencer): BaseParameter[] {
    console.log(sequencer);
    return [];
  }

  fetchForArranger(arranger: Arranger): BaseParameter[] {
    console.log(arranger);
    return [];
  }
}
