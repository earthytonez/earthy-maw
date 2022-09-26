import SequencerType from "../../stores/Sequencer/SequencerType";

import { SEQUENCER_TYPES } from "../../config/constants";

export default class SequencerTypeStore {
  getAll() {
    return SEQUENCER_TYPES.map((type: string, i: number) => {
      let sequencerType = new SequencerType(type, i);
      sequencerType.load();
      return sequencerType;
    });
  }
}
