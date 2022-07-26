import React from "react";

import { observer } from "mobx-react-lite";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

import * as Tone from "tone";

import Box from "@mui/material/Box"

import Arranger from "./Objects/Arranger";
import Sequencer from "./Objects/Sequencer";
import SequencerType from "./Objects/SequencerType";

import BottomBar from "./Components/BottomBar/index";
import TopBar from "./Components/TopBar/index";
import TrackList from "./Components/TrackComponent/TrackListComponent";



import { useStore } from './stores/useStore';

import {
  SEQUENCER_TYPES,
  SYNTH_TYPES,
  SYNTH_TYPE_FROM_STRING,
} from "./config/constants";
import MachineEditDrawer from "./Components/MachineEditDrawer/index";

function synthFromSlug(synthSlug: string) {
  const SynthType = SYNTH_TYPE_FROM_STRING[synthSlug];
  return new SynthType('', Tone.context);
}

function sequencerFromSlug(sequencerSlug: string) {
  return new Sequencer(sequencerSlug);
}

function arrangerFromSlug(arrangerSlug: string) {
  return new Arranger(arrangerSlug);
}

function newMachine(machineType: string, machineSlug: string) {
  if (machineType === "synthesizer") {
    return synthFromSlug(machineSlug);
  }

  if (machineType === "sequencer") {
    return sequencerFromSlug(machineSlug);
  }

  if (machineType === "arranger") {
    return arrangerFromSlug(machineSlug);
  }
}

const ARRANGER_TYPES = ["Repeater"];

function generateSynthTypes() {
  return SYNTH_TYPES;
}

function generateSequencerTypes() {
  return SEQUENCER_TYPES.map((type, i) => {
    let sequencerType = new SequencerType(type, i);
    sequencerType.load();
    return sequencerType;
  });
}

function generateArrangerTypes() {
  return ARRANGER_TYPES.map((type, i) => new Arranger(type, i));
}

const ARRANGER_TYPE_INITIAL_STATE = generateArrangerTypes();
const SYNTH_TYPE_INITIAL_STATE = generateSynthTypes();
const SEQUENCER_TYPE_INITIAL_STATE = generateSequencerTypes();

const App = observer(() => {
  const [arrangerTypes] = React.useState(ARRANGER_TYPE_INITIAL_STATE);
  const [synthTypes] = React.useState(SYNTH_TYPE_INITIAL_STATE);
  const [sequencerTypes] = React.useState(SEQUENCER_TYPE_INITIAL_STATE);

  const store = useStore();
  let tracks = store.trackStore.tracks;
  Tone.setContext(store.audioContext);

  /*
   * Main track/loop
   */
  const onBeforeCapture = (props: any) => {
    console.log("onBeforeCapture");
  };

  const onBeforeDragStart = (props: any) => {
    console.log("onBeforeDragStart");
  };

  const onDragStart = (props: any) => {
    console.log("onDragStart");
  };

  const onDragUpdate = (props: any) => {
    console.log("onDragUpdate");
  };

  const onDragEnd = async (props: any) => {
      if (
        props.destination.droppableId === "track-list" &&
        props.source.droppableId !== "track-list"
      ) {
        console.warn("Can't drop a module onto the track list");
        return;
      }

      const trackInfo = props.destination.droppableId.split("-");
      const trackID = trackInfo[1];
      const machineType = trackInfo[2];
      const machineToAssign = props.draggableId;
    try {
      await tracks[trackID].assignMachine(
        machineType,
        newMachine(machineType, machineToAssign)
      );
    } catch (err) {
      console.error(err);
    }

    store.trackStore.saveTracks();
  };

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <TopBar />
      <Box sx={{marginTop: '82px'}}>
        <TrackList tracks={tracks} />
      </Box>
      <BottomBar
        beatMarker={store.musicFeaturesStore.beatMarker}
        arrangerTypes={arrangerTypes}
        sequencerTypes={sequencerTypes}
        synthTypes={synthTypes}
      />
      <MachineEditDrawer />
    </DragDropContext>
    
  );
});

export default App;