import FirstPanel from './PanelTypes/FirstPanel';
import BasicPanel from './PanelTypes/BasicPanel';
import LastPanel from './PanelTypes/LastPanel';

export default [
  new FirstPanel({
    AttachTo: ".MuiSvgIcon-fontSizeMedium",
    Title: "Welcome to Earthy Maw!",
    Text: ["Here I will show you how to create a basic 4/4 Kick Drum beat.  If there are no tracks open on the track list, click the 'Add Track' button."]
  }).info(),
  new BasicPanel({
    AttachTo: "#open-machine-drawer",
    On: "top",
    Title: "Open the machine menu",
    Text: ["Click here to open the machine menu."],
  }).info(2),
  new BasicPanel({
    AttachTo: "#synthesizer-kick",
    Title: "Add a kick drum synthesizer",
    Text: [
      "Let's add a Kick Drum to the track, drag it to the 'Synthesizer' space on Track 1.",
    ]
  }).info(3),
  new BasicPanel({
    AttachTo: "#sequencers-tab",
    Title: "Open the Sequencers List",
    Text: ["Click on the sequencers tab to open the sequencers list."],
  }).info(4),
  new BasicPanel({
    AttachTo: "#sequencer-FourOTFloor",
    Title: "Add the 'Four on the Floor' sequencer.",
    Text: [ "Drag the 'Four on the Floor' Sequencer to the first track."],
  }).info(5),
  new BasicPanel({
    AttachTo: "#close-machine-drawer",
    Title: "Close the machine menu",
    Text: ["Click here to close the machine menu."],
  }).info(6),
  new LastPanel({
    AttachTo: "#play-button",
    Title: "Press the play button",
    Text: ["Press the play button to hear your kick drum."],
  }).info()
];