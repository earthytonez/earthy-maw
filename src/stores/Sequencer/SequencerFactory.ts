import * as Tone from "tone";

import SequencerLoader from "./SequencerLoader/SequencerLoader";
import ParameterStore from "../Parameter.store";
import PluginStore from "../Plugin.store";
import UserParameterStore from "stores/UserParameter.store";
import MusicFeaturesStore from "stores/MusicFeatures.store";

import Sequencer from "./Sequencer";
import SequencerDefinition from "./SequencerLoader/SequencerDefinition";

export async function fetchTOML(fileName: any): Promise<string | undefined> {
  if (fileName === undefined) return;
  let sequencer = await fetch(require(`./Definitions/${fileName}.toml`));
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
  trackID: string,
  audioContext: Tone.BaseContext,
  trackFeatures: any
) {
  /* 1. Create new sequencer from definition */

  const sequencerTOML = await fetchTOML(sequencerSlug);
  if (!sequencerTOML) {
    throw new Error("sequencerSlug undefined");
  }

  const sequencerLoader = new SequencerLoader(sequencerTOML);
  const sequencerDefinition: SequencerDefinition = await sequencerLoader.load();

  const sequencer = new Sequencer(
    sequencerDefinition,
    audioContext,
    musicFeaturesStore,
    trackFeatures
  );

  /* 2. Load parameters into sequencer */
  let sequencerParameters = parameterStore.fetchForSequencer(
    sequencerDefinition,
    trackID
  );

  const sequencerWithParameters =
    sequencer.registerParameters(sequencerParameters);

  let sequencerWithPlugins = sequencerWithParameters;
  /* 2. Load plugins into sequencer */
  // console.log(`PLUGINS: ${sequencerDefinition.plugins}`);
  // if (sequencerDefinition.plugins) {
  //   sequencerWithPlugins = sequencerWithParameters.registerPlugins(
  //     pluginStore.fetch(sequencerDefinition.plugins, trackID)
  //   );
  // } else {
  //   sequencerWithPlugins = sequencerWithParameters;
  // }

  /* 3. Return Sequencer */
  return sequencerWithPlugins;

  /*********************/
  // Old way of doing it
  // const sequencer = new SYNTH_FROM_STRING[type](vol, audioContext);
}
