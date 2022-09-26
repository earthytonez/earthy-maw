import BaseSynthesizer from "stores/Synthesizer/SynthesizerTypes/Base";

import {
  runInAction,
  makeObservable,
  computed,
  observable,
} from "mobx";

import { GateLengths, SequencerLoader, TriggerWhen } from "./SequencerLoader/index";

import { info } from "../../Util/logger";

import { TOML_FILES } from '../../config/constants';

export default class SequencerType {
  id: number;
  slug: string;
  boundSynthesizer?: BaseSynthesizer = undefined;
  machineType: string = "Sequencer";
  sequencerLoader?: SequencerLoader = undefined;
  type: string = "";
  x = 0;

  awaitBuffers?: Promise<any>;

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

  async load() {
    info(
      "SEQUENCER TYPE",
      `# Loading Sequencer Type`,
      { type: this.type },
      "font-weight:bold"
    );

    if (TOML_FILES[this.type] === undefined) {
      throw new Error(`Sequencer Type Not Found: ${this.type}`)
    }

    this.sequencerLoader = await this.fetchTOML(TOML_FILES[this.type]);
  }

  get gateLengths(): GateLengths | undefined {
    return this.sequencerLoader?.gateLengths();
  }

  get triggerWhen(): TriggerWhen | undefined {
    return this.sequencerLoader?.triggerWhen();
  }

  get name(): string | undefined{
    return this.sequencerLoader?.name;
  }

  get code(): string | undefined {
    return this.sequencerLoader?.code();
  }

  sequencerType(): string | undefined {
    return this.sequencerLoader?.type;
  }

  constructor(type: string, id: number) {
    this.id = id;
    this.slug = type;
    this.type = type;

    makeObservable(this, {
      name: computed,
      slug: observable,
    });
  }
}
