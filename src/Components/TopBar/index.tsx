import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import MachineDrawer from "./MachineDrawer.tsx";
import { MUSIC_THEORY_KEYS, MUSIC_THEORY_SCALES } from "../../config/constants.ts";

type Anchor = "top" | "left" | "bottom" | "right";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
};

interface SideBarProps {
  sequencerTypes: Array<string>;
  arrangerTypes: Array<string>;
  synthTypes: Array<string>;
  tempo: Number;
  setTempo: Function;
  play: boolean;
  playPause: Function;
  musicKey: "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "Ab"
    | "A#"
    | "Bb"
    | "Db"
    | "C#"
    | "Eb"
    | "D#"
    | "F#"
    | "Gb"
    | "G#";
  setKey: Function;
  musicScale: "Major" | "Minor";
  setScale: Function;
}

export default function Sidebar(props: SideBarProps) {
  const { tempo, setTempo, musicScale, setScale, musicKey, setKey, play, playPause } =
    props;

  console.log(musicKey);
  console.log(musicScale);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Synthesizers" {...a11yProps(0)} />
          <Tab label="Sequencers" {...a11yProps(1)} />
          <Tab label="Arrangers" {...a11yProps(2)} />
        </Tabs>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={toggleDrawer("bottom", false)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <MachineDrawer
        slug="synthesizers"
        machines={props.synthTypes}
        index={0}
        value={value}
      />
      <MachineDrawer
        slug="sequencers"
        machines={props.sequencerTypes}
        index={1}
        value={value}
      />
      <MachineDrawer
        slug="arrangers"
        machines={props.arrangerTypes}
        index={2}
        value={value}
      />
    </Box>
  );

  let anchor = "top";
  const checkboxLabel = { inputProps: { "aria-label": "Play Button" } };

  return (
    <React.Fragment>
      <AppBar position="sticky" color="primary" sx={{ top: 0, bottom: "auto" }}>
        <Toolbar>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            Earthy MAW
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <FormGroup style={flexContainer}>
              <Checkbox
                checked={play}
                {...checkboxLabel}
                icon={<PlayArrowIcon />}
                checkedIcon={<PauseIcon />}
                onChange={(event) => {
                  console.log(event.target.checked);
                  playPause(event.target.checked);
                }}
            />
            </FormGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
        <div></div>
      </AppBar>
      <Drawer
        anchor={anchor}
        variant="persistent"
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
