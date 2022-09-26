import Arranger from "../Arranger";
import * as Tone from "tone";

const ARRANGER_TYPES = ["Repeater"];

export default class ArrangerTypeStore {
    getAll() {
        return ARRANGER_TYPES.map((type, _i) => new Arranger(type, Tone.getContext()));
    }
}