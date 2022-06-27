import Synthesizer from "../Synthesizer.ts";

import * as Tone from "tone";
import IPlayParams from "../../Types/IPlayParams";

export default class Sine extends Synthesizer {
  name: string = "Sine Wave";
  slug: string = "sine wave";

  play(params: IPlayParams) {
  }

  constructor() {
    super();
  }
}
