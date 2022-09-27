import React from "react";

import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import CloseIcon from "@mui/icons-material/Close";

import MachineDrawer from "./MachineDrawer";
import ISequencerType from "../../stores/Sequencer/ISequencerType";
import Arranger from "../../stores/Arranger";
import ISynthesizerType from "../../stores/Synthesizer/ISynthesizerType";

import { useUIStore } from "../../stores/UI/useUIStore";

type Anchor = "top" | "left" | "bottom" | "right";
const LEFT_DRAWER_WIDTH = 300;

interface BottomBarDrawerProps {
  anchor: Anchor;
  sequencerTypes: Array<ISequencerType>;
  arrangerTypes: Array<Arranger>;
  synthTypes: Array<ISynthesizerType>;
  toggleDrawer: Function;
}

export default observer((
  props: BottomBarDrawerProps
): React.ReactElement => {
  const uiStore = useUIStore();

  const { closeMachineBrowser, machineBrowserOpen, machinesBrowsing, setMachinesBrowsing } = uiStore;

  const machineIndex = {
    "synthesizer": 0,
    "sequencer": 1,
    "arranger": 2,
    "modulator": 3
  }


  const machineNameFromIndex = [
    "synthesizer",
    "sequencer",
    "arranger",
    "modulator"
  ]

  let defaultIndex = 0;

  if (machinesBrowsing !== undefined && machineIndex[machinesBrowsing as "sequencer" | "modulator" | "synthesizer" | "arranger"] !== undefined) {
    defaultIndex = machineIndex[machinesBrowsing as "sequencer" | "modulator" | "synthesizer" | "arranger"];
  }

  // This isn't working
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMachinesBrowsing(machineNameFromIndex[newValue] as "sequencer" | "modulator" | "synthesizer" | "arranger")
  };

  function a11yProps(index: number) {
    return {
      // id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }


  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: LEFT_DRAWER_WIDTH }}
      role="presentation"
      onKeyDown={props.toggleDrawer(anchor, false)}
    >
        <IconButton
          id="close-machine-drawer"
          color="inherit"
          aria-label="close drawer"
          onClick={closeMachineBrowser}
        >
          <CloseIcon />
        </IconButton>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={defaultIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab id="synthesizers-tab" label="Synthesizers" {...a11yProps(0)} />
          <Tab id="sequencers-tab" label="Sequencers" {...a11yProps(1)} />
          {/* <Tab label="Arrangers" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <MachineDrawer
        slug="synthesizers"
        machines={props.synthTypes}
        index={0}
        value={defaultIndex}
      />
      <MachineDrawer
        slug="sequencers"
        machines={props.sequencerTypes}
        index={1}
        value={defaultIndex}
      />
      <MachineDrawer
        slug="arrangers"
        machines={props.arrangerTypes}
        index={2}
        value={defaultIndex}
      />
    </Box>
  );

  return (
    <Drawer
      anchor={props.anchor}
      variant="persistent"
      open={machineBrowserOpen}
      onClose={props.toggleDrawer(props.anchor, false)}
    >
      {list(props.anchor)}
    </Drawer>
  );
});
