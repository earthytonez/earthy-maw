import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Slider from "@mui/material/Slider";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import CloseIcon from "@mui/icons-material/Close";

import ArraySelectorComponent from './ArraySelectorComponent';

import { useStore } from "../../stores/useStore";
import { useUIStore } from "../../stores/UI/useUIStore";

type Anchor = "top" | "left" | "bottom" | "right";

const MachineEditDrawerRadioGroup = observer(
  ({
    edit,
    name,
    field,
    fieldOptions,
  }: {
    edit: Function;
    name: string;
    field: string;
    fieldOptions: any;
  }): React.ReactElement => {
    if (!fieldOptions) {
      return <Box sx={{ mt: 2 }}></Box>;
    }

    const { options, current } = fieldOptions;
    return (
      <Box sx={{ mt: 2 }}>
        <Typography>{name}</Typography>
        <RadioGroup
          name={field}
          defaultValue={current}
          onChange={(event) => {
            console.log((event.target as HTMLInputElement).value);
            edit(field, (event.target as HTMLInputElement).value);
          }}
        >
          {options.map((option: any, i: number) => {
            return (<FormControlLabel key={i} value={option} control={<Radio />} label={option} />);
          })}
        </RadioGroup>
      </Box>
    );
  }
);

const MachineEditDrawerDial = observer(
  ({
    edit,
    name,
    field,
    fieldOptions,
  }: {
    edit: Function;
    name: string;
    field: string;
    fieldOptions: any;
  }): React.ReactElement => {
    if (!fieldOptions) {
      return <Box sx={{ mt: 2 }}></Box>;
    }

    console.log(edit);
    
    return (
      <Box sx={{ mt: 2 }}>
        <Typography>{name}</Typography>
        <div id={`dial-${field}`} />
      </Box>
    );
  }
);


const LoadParameter = observer(
  ({
    edit,
    name,
    field,
    fieldType,
    fieldOptions,
    increment,
    decrement
  }: {
    edit: Function;
    increment: Function;
    decrement: Function;
    name: string;
    field: string;
    fieldType: string;
    fieldOptions: any;
  }) => {
    switch (fieldType) {
      case "radio":
        return (
          <MachineEditDrawerRadioGroup
            name={name}
            field={field}
            fieldOptions={fieldOptions}
            edit={edit}
          ></MachineEditDrawerRadioGroup>
        );
      case "dial":
        return (
          <MachineEditDrawerDial
            name={name}
            field={field}
            fieldOptions={fieldOptions}
            edit={edit}
          ></MachineEditDrawerDial>
        );
        case "slider":
        return (
          <Box>
            <Typography id="track-false-slider" gutterBottom>
              {name}
            </Typography>
            <Slider
              aria-label={name}
              defaultValue={fieldOptions.current}
              getAriaValueText={() => fieldOptions.current}
              step={1}
              marks
              onChange={(mouseEvent: any) => edit(field, mouseEvent.target.value)}
              min={fieldOptions.min}
              max={fieldOptions.max}
              valueLabelDisplay="auto"
            />
          </Box>
        );
        case "arraySelector":
          return (
            <Box>
              <Typography id="track-false-slider" gutterBottom>
                {name}
              </Typography>
  
              <ArraySelectorComponent
                aria-label={name}
                selectableValues={fieldOptions.options}
                currentValue={fieldOptions.current}
                setValue={(value) => edit(field, value)}
                incrementValue={() => increment(field)}
                decrementValue={() => decrement(field)}
                
              />
            </Box>
          );
  
        default:
        return <Box></Box>;
    }
  }
);

const MachineEditDrawer = observer(() => {
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

  if (objectEditIsOpen) {
    editParameters =
      store.trackStore.tracks[objectEditTrack][objectEditType].editParameters;
    editParameter =
      store.trackStore.tracks[objectEditTrack][objectEditType].changeParameter;
    incrementParameter =
      store.trackStore.tracks[objectEditTrack][objectEditType].incrementParameter;
    decrementParameter =
      store.trackStore.tracks[objectEditTrack][objectEditType].decrementParameter;
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

  console.log(editParameters);

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
