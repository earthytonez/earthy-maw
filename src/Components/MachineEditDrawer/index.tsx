import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

import LoadParameter from "./LoadParameter";

import { useStore } from "../../stores/useStore";
import Track from "../../stores/Track";

import { useUIStore } from "../../stores/UI/useUIStore";
import FullGridIconButton from "Components/TightBorderedGrid/FullGridButton";
import GridTopRightCorner from "Components/TightBorderedGrid/GridTopRightCorner";
import GridTopFullWidth from "Components/TightBorderedGrid/GridTopFullWidth";
import TightBorderedPaper from "Components/TightBorderedGrid/TightBorderedPaper";

type Anchor = "top" | "left" | "bottom" | "right";

const DRAWER_WIDTH = "24vw";

const MachineEditDrawer = observer((): React.ReactElement => {
  const store = useStore();
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
    let trackMachine;
    switch (objectEditType) {
      case "sequencer":
        trackMachine = store.trackStore.tracks.find(
          (track: Track) => track.id === objectEditTrack
        )!.sequencer;
        break;
      case "synthesizer":
        trackMachine = store.trackStore.tracks.find(
          (track: Track) => track.id === objectEditTrack
        )!.synthesizer;
        break;
      case "arranger":
        trackMachine = store.trackStore.tracks.find(
          (track: Track) => track.id === objectEditTrack
        )!.arranger;
        break;
    }

    if (trackMachine) {
      editParameters = trackMachine.editParameters;
      editParameter = trackMachine.changeParameter;
      incrementParameter = trackMachine.incrementParameter;
      decrementParameter = trackMachine.decrementParameter;
    }
  }

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

  let getEditParametersByPlugin = (editParameters: any): any => {
    let retVal: any = {};
    editParameters.forEach((eP: any) => {
      if (eP.plugin) {
        if (retVal[eP.plugin]) {
          retVal[eP.plugin].push(eP);
        } else {
          retVal[eP.plugin] = [eP];
        }
      } else {
        if (retVal["default"]) {
          retVal["default"].push(eP);
        } else {
          retVal["default"] = [eP];
        }
      }
    });
    return retVal;
  };

  let editParametersByPlugin = getEditParametersByPlugin(editParameters);
  let defaultParameters = editParametersByPlugin["default"];
  delete editParametersByPlugin["default"];

  console.log(editParametersByPlugin);

  if (!defaultParameters) {
    defaultParameters = [];
  }

  console.log(defaultParameters);

  return (
    <Drawer anchor={anchor} open={uiStore.objectEditIsOpen}>
      <Box sx={{ padding: "0em 1em", width: { DRAWER_WIDTH } }}>
        <GridTopRightCorner>
          <FullGridIconButton onClick={() => toggleObjectEdit(false)}>
            <CloseIcon fontSize="small" />
          </FullGridIconButton>
        </GridTopRightCorner>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {defaultParameters.map((parameter: any, key: number) => {
            console.log(`MachineEditDrawer: ${JSON.stringify(parameter)}`);
            return (
              <ListItem key={key} sx={{ mb: 5, pr: 0, pl: 0 }}>
                <LoadParameter
                  key={key}
                  edit={editParameter}
                  increment={incrementParameter}
                  decrement={decrementParameter}
                  name={parameter.name}
                  parameterValue={parameter.val}
                  field={parameter.field}
                  fieldType={parameter.fieldType}
                  fieldOptions={parameter.fieldOptions}
                  style={parameter.style}
                />
              </ListItem>
            );
          })}

          {Object.keys(editParametersByPlugin).map(
            (plugin: any, key: number) => {
              return (
                <TightBorderedPaper key={key} sx={{ mt: 3 }}>
                  <GridTopFullWidth>
                    <Typography variant="h4">{plugin}</Typography>
                  </GridTopFullWidth>
                  <Grid container>
                    {editParametersByPlugin[plugin].map(
                      (parameter: any, _key: number) => {
                        console.log(
                          `MachineEditDrawer: ${JSON.stringify(parameter)}`
                        );
                        return (
                          <LoadParameter
                            key={parameter.slug}
                            edit={editParameter}
                            increment={incrementParameter}
                            decrement={decrementParameter}
                            name={parameter.name}
                            field={parameter.field}
                            parameterValue={parameter.val}
                            fieldType={parameter.fieldType}
                            fieldOptions={parameter.fieldOptions}
                            style={parameter.style}
                          />
                        );
                      }
                    )}
                  </Grid>
                </TightBorderedPaper>
              );
            }
          )}
        </List>
      </Box>
    </Drawer>
  );
});

export default MachineEditDrawer;
