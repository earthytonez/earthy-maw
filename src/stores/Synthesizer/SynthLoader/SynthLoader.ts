import toml from "toml";
import { makeObservable, action, computed, observable } from "mobx";

import IParsedSynthTOML from "./IParsedSynthTOML";
import ISynthType from "./ISynthType";

class SynthLoaderHolder {
  name?: string;
  slug?: string;
  type?: ISynthType;
  tags?: string[];
  plugins?: string[];
  description?: string = "";
}

export default class SynthLoader {
  synthCode: string = "";
  synthHolder: SynthLoaderHolder = new SynthLoaderHolder();

  get name() {
    return this.synthHolder.name;
  }

  get description() {
    return this.synthHolder.description;
  }

  get type() {
    return this.synthHolder.type;
  }

  code() {
    return this.synthCode;
  }
  
  async load(): Promise<SynthLoaderHolder> {
    try {
      const data: IParsedSynthTOML = toml.parse(this.synthCode);

      this.synthHolder.name = data.name;
      this.synthHolder.slug = data.name.replaceAll(" ", "_").toLowerCase();
      this.synthHolder.description = data.description;
      this.synthHolder.tags = data.tags;
      this.synthHolder.type = data.type;
      this.synthHolder.plugins = data.plugins;
      return this.synthHolder;
    } catch (err) {
      return this.synthHolder;
    }
  }

  constructor(synthCode: string) {
    this.synthCode = synthCode;
    makeObservable(this, {
      synthHolder: observable,
      synthCode: observable,
      name: computed,
      type: computed,
      load: action,
      // fetch: flow
    });
  }
}
