import React from "react";

import { observer } from "mobx-react-lite";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

import * as Tone from "tone";

import Box from "@mui/material/Box"

import Arranger from "./Objects/Arranger";
import SequencerType from "./Objects/Sequencer/SequencerType";

import BottomBar from "./Components/BottomBar/index";
import TopBar from "./Components/TopBar/index";
import TrackList from "./Components/TrackComponent/TrackListComponent";

import { useStore } from './stores/useStore';

import {
  SEQUENCER_TYPES,
  SYNTH_TYPES,
} from "./config/constants";
import MachineEditDrawer from "./Components/MachineEditDrawer/index";


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
  return ARRANGER_TYPES.map((type, _i) => new Arranger(type, Tone.getContext()));
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
  const onBeforeCapture = (_props: any) => {
    console.log("onBeforeCapture");
  };

  const onBeforeDragStart = (_props: any) => {
    console.log("onBeforeDragStart");
  };

  const onDragStart = (_props: any) => {
    console.log("onDragStart");
  };

  const onDragUpdate = (_props: any) => {
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
      if (!tracks || !tracks[trackID]) {
        throw new Error("Track not found");
      }
      await tracks[trackID]!.assignMachine(
        machineType, machineToAssign
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
        <TrackList/>
      </Box>
      <BottomBar
        arrangerTypes={arrangerTypes}
        sequencerTypes={sequencerTypes}
        synthTypes={synthTypes}
      />
      <MachineEditDrawer />
    </DragDropContext>
    
  );
});

export default App;