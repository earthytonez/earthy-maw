import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import MachineDrawer from "./MachineDrawer";
import MenuIcon from "@mui/icons-material/Menu";

import SequencerType from "../../Objects/Sequencer/SequencerType";
import Arranger from "../../Objects/Arranger";
import ISynthesizerType from "../../Objects/Synthesizer/ISynthesizerType";

type Anchor = "top" | "left" | "bottom" | "right";

interface BottomBarDrawerProps {
  bottom: boolean;
  anchor: Anchor;
  sequencerTypes: Array<SequencerType>;
  arrangerTypes: Array<Arranger>;
  synthTypes: Array<ISynthesizerType>;
  toggleDrawer: Function;
}

export default function BottomBarDrawer(
  props: BottomBarDrawerProps
): React.ReactElement {

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={props.toggleDrawer(anchor, false)}
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
          onClick={props.toggleDrawer("bottom", false)}
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

  return (
    <Drawer
      anchor={props.anchor}
      variant="persistent"
      open={props.bottom}
      onClose={props.toggleDrawer(props.anchor, false)}
    >
      {list(props.anchor)}
    </Drawer>
  );
}
