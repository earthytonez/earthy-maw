import React, { useEffect } from "react";
import "./App.css";

import Bell from "./Objects/Synthesizers/Bell.ts";
import Kick from "./Objects/Synthesizers/Kick.ts";
import HiHat from "./Objects/Synthesizers/HiHat.ts";

import Arranger from "./Objects/Arranger.ts";
import Sequencer from "./Objects/Sequencer.ts";
import Track from "./Objects/Track.ts";
// import MusicCanvas from "./Components/MusicCanvas/index.tsx";

import BottomBar from "./Components/BottomBar/index.tsx";
import TopBar from "./Components/TopBar/index.tsx";
import TrackList from "./Components/TrackComponent/TrackListComponent.tsx";

import { DragDropContext } from "react-beautiful-dnd";

import { SEQUENCER_TYPES, SYNTH_TYPES } from "./config/constants.ts";

function getInterval(tempo: number): number {
  return (60 * 1000) / (tempo * 4);
}

const synthTypeFromString = {
  bell: Bell,
  hihat: HiHat,
  kick: Kick,
};

const audioContext = new AudioContext({
  latencyHint: "interactive"
});

console.log(audioContext.sampleRate);
console.log(audioContext.destination.channelCount);

function synthFromSlug(synthSlug: string) {
  const SynthType = synthTypeFromString[synthSlug];
  return new SynthType(audioContext);
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

function App() {
  const [arrangerTypes] = React.useState(ARRANGER_TYPE_INITIAL_STATE);
  const [synthTypes] = React.useState(SYNTH_TYPE_INITIAL_STATE);
  const [sequencerTypes] = React.useState(SEQUENCER_TYPE_INITIAL_STATE);

  const [tracks, setTracks] = React.useState([]);

  const [tempo, setTempo] = React.useState(120);
  const [play, setPlay] = React.useState(false);
  const [musicKey, setKey] = React.useState('C');
  const [musicScale, setScale] = React.useState('Major');
  
  useEffect(() => {
    console.log("Loading tracks");
    const _trackLS = JSON.parse(localStorage.getItem("tracks")!);
    console.log(_trackLS);
    if (_trackLS && _trackLS.length > 0) {
      let trackObjects = _trackLS.map(
        (track, i) => new Track(i, audioContext, track)
      );
      console.log(trackObjects);
      setTracks(trackObjects);
    } else {
      setTracks([
        new Track(0, audioContext),
        new Track(1, audioContext),
        new Track(2, audioContext),
      ]);
    }
  }, []);


  const [intervalRunning, setIntervalRunning] = React.useState(false);
  console.log(`Interval is ${getInterval(tempo)}`);
  if (!intervalRunning) {
    let beatNumber: number = 1;
    setInterval(() => {
      if (!play) {
        return;
      }
      setIntervalRunning(true);
      tracks.forEach((track: Track) => {
        try {
          console.log("Ticking");
          track.tick(key, scale, beatNumber);
          beatNumber++;
        } catch (err: any) {}
      });
    }, getInterval(tempo));
  }

  const saveTracks = () => {
    localStorage.setItem("tracks", JSON.stringify(tracks));
  };

  useEffect(() => {
    console.log("Setting tracks in localStorage");
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

  console.log(">>>>>>>>>>>>");
  console.log(musicKey);
  console.log(musicScale);

  const playPause = (play: boolean) => {
    if (play == true) {
      audioContext.resume();
    } else {
      audioContext.suspend();
    }
    setPlay(play);

  }

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
        setTempo={setTempo}
        play={play}
        playPause={playPause}
        musicKey={musicKey}
        setKey={setKey}
        musicScale={musicScale}
        setScale={setScale}
      />
      <BottomBar
        arrangerTypes={arrangerTypes}
        sequencerTypes={sequencerTypes}
        synthTypes={synthTypes}
        tempo={tempo}
        setTempo={setTempo}
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
}

export default App;

