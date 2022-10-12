import { SYNTH_TYPE_FROM_STRING } from "../../config/constants";

import { error } from "../../Util/logger";
import SynthLoader from "./SynthLoader/SynthLoader";
import ParameterStore from "../Parameter.store";
import PluginStore from "../Plugin.store";
import UserParameterStore from "stores/UserParameter.store";

async function fetchTOML(fileName: any): Promise<string | undefined> {
  if (fileName === undefined) return;
  let synth = await fetch(require(`./Definitions/${fileName}.toml`));
  let synthText = await synth.text();

  if (!synthText.startsWith("name")) {
    console.log(`./Definitions/${fileName}.toml`);
    console.log(synthText);
    throw new Error("synthText did not start with name");
  }

  return synthText;
}

function baseSynthType(synthType: string): string {
  if (synthType.includes("<")) {
    return synthType.split("<")[0]!;
  }
  return synthType;
}

export async function getSynthesizer(
  userParameterStore: UserParameterStore,
  parameterStore: ParameterStore,
  pluginStore: PluginStore,
  synthSlug: string,
  trackID: string
) {
  try {
    /* 1. Create new synthesizer from definition */

    const synthTOML = await fetchTOML(synthSlug);
    if (!synthTOML) {
      throw new Error("synthSlug undefined");
    }
    const synthesizerLoader = new SynthLoader(synthTOML);
    const synthDefinition = await synthesizerLoader.load();
    let baseSynth = baseSynthType(synthDefinition.type!);

    const synthesizer = new SYNTH_TYPE_FROM_STRING[baseSynth](
      synthDefinition,
      userParameterStore
    );
    /* 2. Load parameters into synthesizer */
    const synthesizerWithParameters = synthesizer.registerParameters(
      parameterStore.fetchForSynth(synthDefinition, trackID)
    );

    let synthesizerWithPlugins;
    /* 2. Load plugins into synthesizer */
    console.log(`PLUGINS: ${synthDefinition.plugins}`);
    if (synthDefinition.plugins) {
      synthesizerWithPlugins = synthesizerWithParameters.registerPlugins(
        pluginStore.fetch(synthDefinition.plugins, trackID)
      );
    } else {
      synthesizerWithPlugins = synthesizerWithParameters;
    }

    /* 3. Return Synthesizer */
    return synthesizerWithPlugins;

    /*********************/
    // Old way of doing it
    // const synthesizer = new SYNTH_FROM_STRING[type](vol, audioContext);
  } catch (err: any) {
    error("SynthesizerFactory", err);
    error("SynthesizerFactory", `Error getting synthesizer: ${synthSlug}`, err);
    return undefined;
  }
}
