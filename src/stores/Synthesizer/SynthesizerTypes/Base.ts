import { observable, makeObservable, action } from "mobx";
import * as Tone from "tone";

import { ISequencerGate } from "../../Sequencer/SequencerRunner/SequencerGate";
import IPlayParams from "../../../Types/IPlayParams";
import ISynthDefinition from "../SynthLoader/ISynthDefinition";
import BaseParameter from "../../Parameter/Base";
import BasePlugin, { IPluginNode } from "../../Plugins/Base";
import NumericParameter from "stores/Parameter/NumericParameter";
import { debug } from "../../../Util/logger";
import ISynthEditableParams from '../ISynthEditableParams';

export default class BaseSynthesizer {
  name: string;
  slug: string;
  description: string;
  type: string;

  loading: boolean = true;

  synth: any;
  _parameters: Map<string, BaseParameter> = new Map();

  pluginNodes: IPluginNode[] = [];

  /*
   * I don't think the synthesizer needs to know about the userparameter store since plugins and parameters
   * are created with references to it.
   */
  constructor(SynthDefinition: ISynthDefinition) {
    this.name = SynthDefinition.name;
    this.description = SynthDefinition.description;
    this.slug = SynthDefinition.slug;
    this.type = SynthDefinition.type;

    makeObservable(this, {
      _parameters: observable,
      changeParameter: action.bound,
      parameterValue: action.bound,
      numericParameter: action.bound,
      stringParameter: action.bound,
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  changeParameter(parameterSlug: string, value: any) {
    if (!this._parameters) {
      throw new Error("No Parameters");
    }

    let parameter = this._parameters.get(parameterSlug);

    if (!parameter) {
      throw new Error("Invalid Parameter");
    }
    parameter.setValue(value);
  }

  incrementParameter(parameterSlug: string): void {
    if (!this._parameters) {
      throw new Error("No Parameters");
    }

    let parameter = this._parameters.get(parameterSlug) as NumericParameter;

    if (!parameter) {
      throw new Error("Invalid Parameter");
    }

    if (parameter.type === "numeric") {
      parameter.increment();
    }
  }

  decrementParameter(parameterSlug: string): void {
    if (!this._parameters) {
      throw new Error("No Parameters");
    }

    let parameter = this._parameters.get(parameterSlug) as NumericParameter;

    if (!parameter) {
      throw new Error("Invalid Parameter");
    }

    if (parameter.type === "numeric") {
      parameter.decrement();
    }
  }

  get editParameters(): ISynthEditableParams[] {
    return Array.from(this._parameters!.values());
  }

  // get _editParameters(): BaseParameter[] {
  //   debug("SYNTHESIZER_BASE", "_editParameters", this._parameters)
  //   
  // }

  // loadParameters(_parameters: Map<string, BaseParameter>) {
    // this._parameters = parameters;
  // }

  attachVolume(vol: Tone.Volume) {
    let headNode = this.synth;

    this.pluginNodes.forEach((pluginNode: IPluginNode) => {
      headNode.connect(pluginNode.ToneJSNode);
    });

    if (vol) {
      headNode.connect(vol);
    }
  }

  /* Here we have parameters, how does the data get back to the plugin, or wherever it 
     is supposed to go?  I think you change the userdata and everything pulls from that.
     */
  registerParameter(parameter: BaseParameter) {
    this._parameters?.set(parameter.slug, parameter);
  }

  registerParameters(parameters: BaseParameter[]): BaseSynthesizer {
    if (!parameters) {
      return this;
    }
    parameters.forEach((parameter: BaseParameter) => {
      this.registerParameter(parameter);
    });

    return this;
  }

  registerPlugins(plugins: BasePlugin[]): BaseSynthesizer {
    console.log(`PLUGINS: ${JSON.stringify(plugins)}`);
    if (!plugins) {
      return this;
    }
    this.pluginNodes = plugins.map((plugin: BasePlugin): IPluginNode => {
      this.registerParameters(plugin.parameters)
      return plugin._node!;
    });

    return this;
  }

  /*
   * calculateParameter gets the actual parameter data which should be decided based on three
   * values.
   *
   * 1. The default of the parameter.
   * 2. Any user changes to the value of the parameter.
   * 3. Any modulation changes to the value of the parameter.
   */
  parameterValue(slug: string): any {
    try {
      return this._parameters.get(slug)!.val();
    } catch (err) {
      throw new Error(`parameterValue slug: ${slug} error: ${err}`);
    }
  }

  numericParameter(slug: string): number {
    return this.parameterValue(slug) as number;
  }

  stringParameter(slug: string): string {
    return this.parameterValue(slug) as string;
  }

  play(_gate: ISequencerGate, params: IPlayParams) {
    // this.numericParameter("pitch")
    // this.numericParameter("pitch")
    let pitch = params.note;
    
    if (!pitch) {
      pitch = Tone.Frequency(this.numericParameter("pitch"), "midi");
    }

    debug(`BaseSynthesizer`, "play", {
      pitch: pitch,
      time: params.time,
      params: params
    });
    this.synth.triggerAttackRelease(
      pitch,
      "16n",
      params.time
    );
  }
}
