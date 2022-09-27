import {
  SEQUENCER_TYPES,
} from "../../config/constants";


export default class SynthTypeStore {
  getAll() {
      return SEQUENCER_TYPES;
  }
}