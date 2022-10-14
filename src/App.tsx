import React from "react";

import { observer } from "mobx-react-lite";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

import Box from "@mui/material/Box";

import BottomBar from "./Components/BottomBar/index";
import TopBar from "./Components/TopBar/index";
import TrackList from "./Components/TrackComponent/TrackListComponent";

import { useStore } from "./stores/useStore";

import MachineEditDrawer from "./Components/MachineEditDrawer/index";
import Track from "./stores/Track";

import { PropagateLoader } from "react-spinners";

const App = observer(() => {
  const store = useStore();

  const ARRANGER_TYPE_INITIAL_STATE = store.arrangerTypes();
  const SYNTH_TYPE_INITIAL_STATE = store.synthTypes();
  const SEQUENCER_TYPE_INITIAL_STATE = store.sequencerTypes();

  const [arrangerTypes] = React.useState(ARRANGER_TYPE_INITIAL_STATE);
  const [synthTypes] = React.useState(SYNTH_TYPE_INITIAL_STATE);
  const [sequencerTypes] = React.useState(SEQUENCER_TYPE_INITIAL_STATE);

  let tracks = store.trackStore.tracks;

  // Tone.setContext(store.audioContext);
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
      if (
        !tracks ||
        !tracks.find((track: Track) => {
          return track.id === trackID;
        })
      ) {
        throw new Error("Track not found");
      }
      let track = tracks.find((track: Track) => {
        return track.id === trackID;
      });
      await track!.assignMachine(machineType, machineToAssign);
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
      <Box sx={{ marginTop: "72px" }}>
        <React.Suspense fallback={<PropagateLoader color="#36d7b7" />}>
          <TrackList />
        </React.Suspense>
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
