import BaseSynthesizer from "stores/Synthesizer/SynthesizerTypes/Base";

import { runInAction, makeObservable, observable } from "mobx";

import { SequencerLoader } from "./SequencerLoader/index";

import SequencerDefinition from "./SequencerLoader/SequencerDefinition";

export default class SequencerType {
  name: string;
  slug: string;
  boundSynthesizer?: BaseSynthesizer = undefined;
  machineType: string = "Sequencer";
  sequencerLoader?: SequencerLoader = undefined;
  type: string = "";
  x = 0;

  awaitBuffers?: Promise<any>;

  constructor(sequencerDefinition: SequencerDefinition) {
    this.name = sequencerDefinition.name!;
    this.slug = sequencerDefinition.slug!;
    this.type = sequencerDefinition.type!;

    makeObservable(this, {
      name: observable,
      slug: observable,
    });
  }

  isSynth() {
    return false;
  }

  async fetchTOML(fileName: any) {
    if (fileName === undefined) return;
    let seq = await fetch(fileName);
    let seqText = await seq.text();

    if (!seqText.startsWith("name")) {
      throw new Error("seqText did not start with name");
    }

    runInAction(() => {
      this.sequencerLoader = new SequencerLoader(seqText);
      this.sequencerLoader.load();
    });

    return this.sequencerLoader;
  }

  get code(): string | undefined {
    return this.sequencerLoader?.code();
  }

  sequencerType(): string | undefined {
    return this.sequencerLoader?.type;
  }
}
