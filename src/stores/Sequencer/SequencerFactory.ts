import * as Tone from 'tone';

import { error } from "../../Util/logger";
import SequencerLoader from "./SequencerLoader/SequencerLoader";
import ParameterStore from '../Parameter.store';
import PluginStore from '../Plugin.store';
import UserParameterStore from "stores/UserParameter.store";
import MusicFeaturesStore from "stores/MusicFeatures.store";

import Sequencer from "./Sequencer";

export async function fetchTOML(fileName: any): Promise<string | undefined> {
  if (fileName === undefined) return;
  let sequencer = await fetch(require(`./Definitions/${fileName}`));
  let sequencerText = await sequencer.text();
  
  if (!sequencerText.startsWith("name")) {
    console.log(`./Definitions/${fileName}.toml`);
    console.log(sequencerText);
    throw new Error("sequencerText did not start with name");
  }

  return sequencerText;
}

// function baseSequencerType(sequencerType: string): string {
//   if (sequencerType.includes("<")) {
//     return sequencerType.split("<")[0]!;
//   }
//   return sequencerType;
// }

export async function getSequencer(
  _userParameterStore: UserParameterStore,
  parameterStore: ParameterStore,
  musicFeaturesStore: MusicFeaturesStore,
  _pluginStore: PluginStore,
  sequencerSlug: string,
  trackNumber: number,
  audioContext: Tone.BaseContext,
  trackFeatures: any
) {
  try {
    /* 1. Create new sequencer from definition */

    const sequencerTOML = await fetchTOML(sequencerSlug);
    if (!sequencerTOML) {
      throw new Error("sequencerSlug undefined");
    }
    const sequencerLoader = new SequencerLoader(sequencerTOML);
    const sequencerDefinition = await sequencerLoader.load();
    // let baseSequencer = baseSequencerType(sequencerDefinition.type!)

    const sequencer = new Sequencer(
      sequencerDefinition,
      audioContext,
      musicFeaturesStore,
      trackFeatures
    );
    /* 2. Load parameters into sequencer */
    const sequencerWithParameters = sequencer.registerParameters(
      parameterStore.fetchForSequencer(sequencer, trackNumber)
    );

    let sequencerWithPlugins = sequencerWithParameters;
    /* 2. Load plugins into sequencer */
    // console.log(`PLUGINS: ${sequencerDefinition.plugins}`);
    // if (sequencerDefinition.plugins) {
    //   sequencerWithPlugins = sequencerWithParameters.registerPlugins(
    //     pluginStore.fetch(sequencerDefinition.plugins, trackNumber)
    //   );  
    // } else {
    //   sequencerWithPlugins = sequencerWithParameters;
    // }


    /* 3. Return Sequencer */
    return sequencerWithPlugins;

    /*********************/
    // Old way of doing it
    // const sequencer = new SYNTH_FROM_STRING[type](vol, audioContext);
  } catch (err: any) {
    error("SequencerFactory", err);
    error(
      "SequencerFactory",
      `Error getting sequencer: ${sequencerSlug}`,
      err
    );
    return undefined;
  }
}
