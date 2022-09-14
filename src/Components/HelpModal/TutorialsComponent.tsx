import React, { useContext } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ShepherdTour, ShepherdTourContext } from "react-shepherd";

import "shepherd.js/dist/css/shepherd.css";

let TutorialSteps = [[]];
TutorialSteps[1] = require("./Tutorials/Tutorial-1").default;
TutorialSteps[2] = require("./Tutorials/Tutorial-2").default;
TutorialSteps[3] = require("./Tutorials/Tutorial-3").default;
TutorialSteps[4] = require("./Tutorials/Tutorial-4").default;
TutorialSteps[5] = require("./Tutorials/Tutorial-5").default;

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

const TutorialMenuItem = ({title}: {title: string}) => {
    const tour = useContext(ShepherdTourContext);
    return (
        <MenuItem onClick={tour!.start}>
            {title}
        </MenuItem>
    );
}

const TutorialsComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Tutorials
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <ShepherdTour steps={TutorialSteps[1]!} tourOptions={tourOptions}>
            <TutorialMenuItem title="Tutorial 1: Add a Kick Drum"></TutorialMenuItem>
        </ShepherdTour>
        {/* <ShepherdTour steps={TutorialSteps[2]!} tourOptions={tourOptions}>
            <TutorialMenuItem title="Tutorial 2: Add Some Hi Hats"></TutorialMenuItem>
        </ShepherdTour>
        <ShepherdTour steps={TutorialSteps[3]!} tourOptions={tourOptions}>
            <TutorialMenuItem title="Tutorial 3: Add a Bass"></TutorialMenuItem>
        </ShepherdTour> */}
      </Menu>
    </React.Fragment>
  );
};

export default TutorialsComponent;
