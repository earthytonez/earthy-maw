import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import CloseIcon from "@mui/icons-material/Close";

import LoadParameter from "./LoadParameter"


import { useStore } from "../../stores/useStore";
import { useUIStore } from "../../stores/UI/useUIStore";

type Anchor = "top" | "left" | "bottom" | "right";

const MachineEditDrawer = observer((): React.ReactElement => {
  const store   = useStore();
  const uiStore = useUIStore();

  const {
    toggleObjectEdit,
    objectEditTrack,
    objectEditType,
    objectEditIsOpen,
  } = uiStore;

  let anchor: Anchor = "right";

  let editParameters = [];
  let editParameter: Function;
  let incrementParameter: Function;
  let decrementParameter: Function;

  if (objectEditTrack !== undefined && objectEditType && objectEditIsOpen) {
    if (typeof objectEditTrack == "number") {
      let trackMachine;
      switch (objectEditType) {
        case "sequencer":
          trackMachine = store.trackStore.tracks[objectEditTrack]!.sequencer;
          break;
        case "synthesizer":
          trackMachine = store.trackStore.tracks[objectEditTrack]!.synthesizer;
          break;
        case "arranger":
          trackMachine = store.trackStore.tracks[objectEditTrack]!.arranger;
          break;
      }

      console.log(trackMachine);

      if (trackMachine) {
        editParameters = trackMachine.editParameters;
        editParameter = trackMachine.changeParameter;
        incrementParameter = trackMachine.incrementParameter;
        decrementParameter = trackMachine.decrementParameter;
      }
    }
  }
  console.log(editParameters);
  if (!editParameters) {
    return (
      <Drawer anchor={anchor} open={uiStore.objectEditIsOpen} sx={{ p: 4 }}>
        <Box sx={{ padding: "0em 1em", width: "20vw" }}>
          <Button onClick={() => toggleObjectEdit(false)}>
            <CloseIcon fontSize="small" />
          </Button>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer anchor={anchor} open={uiStore.objectEditIsOpen}>
      <Box sx={{ padding: "0em 1em", width: "20vw" }}>
        <Button onClick={() => toggleObjectEdit(false)}>
          <CloseIcon fontSize="small" />
        </Button>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {editParameters.map((parameter: any, key: number) => {
            console.log(parameter);
            return (
              <ListItem key={key}>
                <LoadParameter
                  key={key}
                  edit={editParameter}
                  increment={incrementParameter}
                  decrement={decrementParameter}
                  name={parameter.name}
                  field={parameter.field}
                  fieldType={parameter.fieldType}
                  fieldOptions={parameter.fieldOptions}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
});

export default MachineEditDrawer;
