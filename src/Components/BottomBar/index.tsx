import * as React from "react";
import CSS from "csstype";
import { observer } from "mobx-react-lite";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/More";

import FeatureSelect from "./FeatureSelect";
import BottomBarDrawer from "./BottomBarDrawer";

import ISequencerType from "../../stores/Sequencer/ISequencerType";
import Arranger from "../../stores/Arranger";
import ISynthesizerType from "../../stores/Synthesizer/ISynthesizerType";

import { useStore } from "../../stores/useStore";
import { useUIStore } from "../../stores/UI/useUIStore";

import HelpModal from "../HelpModal";
import Tutorials from "../HelpModal/TutorialsComponent";
import {
  MUSIC_THEORY_KEYS,
  MUSIC_THEORY_SCALES,
  MUSIC_THEORY_CHORDS,
} from "../../config/constants";

const flexContainer: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
};

interface BottomBarProps {
  sequencerTypes: Array<ISequencerType>;
  arrangerTypes: Array<Arranger>;
  synthTypes: Array<ISynthesizerType>;
}

const BottomBar = observer((props: BottomBarProps) => {
  const store = useStore();
  const uiStore = useUIStore();

  const [openHelpModal, setOpenHelpModal] = React.useState(false);
  const handleOpenHelpModal = () => setOpenHelpModal(true);
  const handleCloseHelpModal = () => setOpenHelpModal(false);

  const { toggleObjectEdit } = uiStore;

  const { musicChord, setChord, musicScale, setScale, musicKey, setKey } =
    store.musicFeaturesStore;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      uiStore.browseMachines(undefined, open);
    };

  console.log(musicScale);

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton
            id="open-machine-drawer"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <FormGroup style={flexContainer}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <FeatureSelect
                  title="Keys"
                  slug="keys"
                  value={musicKey.val}
                  change={setKey}
                  options={MUSIC_THEORY_KEYS}
                  valuePending={musicKey.valuePending}
                />
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
                <FeatureSelect
                  title="Scale"
                  slug="scale"
                  value={musicScale.val.name}
                  change={setScale}
                  options={MUSIC_THEORY_SCALES}
                  valuePending={musicScale.valuePending}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <FeatureSelect
                  title="Chord"
                  slug="chord"
                  value={musicChord.val.name}
                  change={setChord}
                  options={MUSIC_THEORY_CHORDS}
                  valuePending={musicChord.valuePending}
                />
              </FormControl>
            </FormGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
          >
            <Tutorials />
          </Box>
          <Box
            sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
          >
            <Button onClick={handleOpenHelpModal}>Help</Button>
            <HelpModal
              open={openHelpModal}
              handleClose={handleCloseHelpModal}
            />
          </Box>
        </Toolbar>
        <div></div>
      </AppBar>
      <BottomBarDrawer
        anchor="left"
        sequencerTypes={props.sequencerTypes}
        synthTypes={props.synthTypes}
        arrangerTypes={props.arrangerTypes}
        toggleDrawer={toggleDrawer}
      />
    </React.Fragment>
  );
});

export default BottomBar;
