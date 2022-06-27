import React, { useEffect } from "react";
import "./App.css";

import * as Tone from "tone";

import Arranger from "./Objects/Arranger.ts";
import Sequencer from "./Objects/Sequencer.ts";
import Track from "./Objects/Track.ts";
// import MusicCanvas from "./Components/MusicCanvas/index.tsx";

import BottomBar from "./Components/BottomBar/index.tsx";
import TopBar from "./Components/TopBar/index.tsx";
import TrackList from "./Components/TrackComponent/TrackListComponent.tsx";

import { debug, error, info } from "./Util/logger.ts";

import { observer } from "mobx-react-lite";
import { DragDropContext } from "react-beautiful-dnd";

import {
  SEQUENCER_TYPES,
  SYNTH_TYPES,
  SYNTH_TYPE_FROM_STRING,
} from "./config/constants.ts";

function synthFromSlug(synthSlug: string) {
  const SynthType = SYNTH_TYPE_FROM_STRING[synthSlug];
  return new SynthType();
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
    let sequencerType = new Sequencer(type, i);
    console.log("Loading Sequencer Type");
    console.log(sequencerType);
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

  const [tracks, setTracks] = React.useState([]);

  const [tempo, setTempo] = React.useState(120);
  const [play, setPlay] = React.useState(false);

  const [musicKey, setKey] = React.useState("C");
  const [musicScale, setScale] = React.useState("Major");

  const [beatNumber, setBeatNumber] = React.useState(0);

  /*
   * Main track/loop
   */

  const repeatLoop = (time) => {

    tracks.forEach((track: Track, i: number) => {
      try {
        track.tick(musicKey, musicScale, beatNumber, time);
        setBeatNumber(beatNumber + 1);
      } catch (err: any) {
        error("Error caught during track loop", err);
      }
    });
  }

  useEffect(() => {
    const _trackLS = JSON.parse(localStorage.getItem("tracks")!);
    if (_trackLS && _trackLS.length > 0) {
      let trackObjects = _trackLS.map((track, i) => new Track(i, track));
      setTracks(trackObjects);
    } else {
      setTracks([new Track(0), new Track(1), new Track(2)]);
    }
  }, []);

  /*
   * Start Tone repeat loop once.
   */
  useEffect(() => {
    debug("Starting Tone.Transport.scheduleRepeat");
    Tone.Transport.scheduleRepeat(repeatLoop, "16n");
  }, [tracks]);

  const saveTracks = () => {
    debug(JSON.stringify(tracks));
    localStorage.setItem("tracks", JSON.stringify(tracks));
  };

  useEffect(() => {
    saveTracks();
  }, [tracks]);

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

  const onDragEnd = (props: any) => {
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
    tracks[trackID].assignMachine(
      machineType,
      newMachine(machineType, machineToAssign)
    );
    saveTracks();
  };

  const setTempoWrapper = (tempo: number) => {
    Tone.Transport.bpm.value = 60;
    setTempo(60);
  };

  console.log(`play: ${play}`);

  const playPause = (play: boolean) => {
    if (play === true) {
      info("Stopping Tone.Transport");
      Tone.Transport.stop();
    } else {
      info("Starting Tone.Transport");
      Tone.start();
      Tone.Transport.start();
      Tone.context.resume();
    }
    console.log(`Set Play to ${!play}`);
    setPlay(play);
    console.log(`play: ${play}`);
  };

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <TopBar
        arrangerTypes={arrangerTypes}
        sequencerTypes={sequencerTypes}
        synthTypes={synthTypes}
        tempo={tempo}
        setTempo={setTempoWrapper}
        play={play}
        playPause={playPause}
        musicKey={musicKey}
        setKey={setKey}
        musicScale={musicScale}
        setScale={setScale}
      />
      <BottomBar
        beatNumber={beatNumber}
        arrangerTypes={arrangerTypes}
        sequencerTypes={sequencerTypes}
        synthTypes={synthTypes}
        tempo={tempo}
        setTempo={setTempoWrapper}
        play={play}
        playPause={playPause}
        musicKey={musicKey}
        setKey={setKey}
        musicScale={musicScale}
        setScale={setScale}
      />
      <TrackList tracks={tracks} />
    </DragDropContext>
  );
});

export default App;
