import * as React from "react";
import CSS from "csstype";
import { observer } from "mobx-react-lite";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/More";

import BottomBarDrawer from "./BottomBarDrawer";

import SequencerType from "../../Objects/Sequencer/SequencerType";
import Arranger from "../../Objects/Arranger";
import ISynthesizerType from "../../Objects/Synthesizer/ISynthesizerType";

import { useStore } from "../../stores/useStore";
import { useUIStore } from "../../stores/UI/useUIStore";

import {
  MUSIC_THEORY_KEYS,
  MUSIC_THEORY_SCALES,
  MUSIC_THEORY_CHORDS,
} from "../../config/constants";

type Anchor = "top" | "left" | "bottom" | "right";

const flexContainer: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
};

interface BottomBarProps {
  sequencerTypes: Array<SequencerType>;
  arrangerTypes: Array<Arranger>;
  synthTypes: Array<ISynthesizerType>;
}

const BottomBar = observer((props: BottomBarProps) => {
  const store = useStore();

  const uiStore = useUIStore();
  const { toggleObjectEdit } = uiStore;

  const { musicChord, setChord, musicScale, setScale, musicKey, setKey } =
    store.musicFeaturesStore;

  const toggleDrawer =
    (drawerAnchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [drawerAnchor]: open });
    };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("bottom", true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <FormGroup style={flexContainer}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel id="key-label">Key</InputLabel>
                <Select
                  labelId="key-label"
                  id="key-select"
                  value={musicKey}
                  label="Key"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setKey(event.target.value);
                  }}
                >
                  {MUSIC_THEORY_KEYS.map((keyOption: string, i: number) => {
                    return (
                      <MenuItem key={i} value={keyOption}>
                        {keyOption}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    toggleObjectEdit(
                      true,
                      "musicFeature",
                      "musicFeature",
                      "Key"
                    )
                  }
                  edge="end"
                >
                  <MoreIcon />
                </IconButton>
              </FormControl>

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel id="scale-label">Scale</InputLabel>
                <Select
                  labelId="scale-label"
                  id="scale-select"
                  value={musicScale}
                  label="Scale"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setScale(event.target.value);
                  }}
                >
                  {MUSIC_THEORY_SCALES.map((scaleOption: string, i: number) => {
                    return (
                      <MenuItem key={i} value={scaleOption}>
                        {scaleOption}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel id="scale-label">Chord</InputLabel>
                <Select
                  labelId="scale-label"
                  id="scale-select"
                  value={musicChord}
                  label="Chord"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setChord(event.target.value);
                  }}
                >
                  {MUSIC_THEORY_CHORDS.map((chordOption: string, i: number) => {
                    return (
                      <MenuItem key={i} value={chordOption}>
                        {chordOption}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </FormGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
        <div></div>
      </AppBar>
      <BottomBarDrawer
        anchor="bottom"
        bottom={state.bottom}
        sequencerTypes={props.sequencerTypes}
        synthTypes={props.synthTypes}
        arrangerTypes={props.arrangerTypes}
        toggleDrawer={toggleDrawer}
      />
    </React.Fragment>
  );
});

export default BottomBar;
