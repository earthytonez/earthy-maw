import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Slider from "@mui/joy/Slider";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";

import CloseIcon from "@mui/icons-material/Close";

import ArraySelector from './ArraySelector';

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
  }) => {
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
            console.log(i);
            return <Radio key={i} label={option} value={option} size="sm" />;
          })}
        </RadioGroup>
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
    console.log("Return fieldType");
    console.log(edit);
    console.log(name);
    console.log(field);
    console.log(fieldType);
    console.log(fieldOptions);
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
              min={fieldOptions.options[0]}
              max={fieldOptions.options[fieldOptions.length - 1]}
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
  
              <ArraySelector
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
    objectEditing,
  } = uiStore;

  let anchor = "right";

  let editParameters = [];
  let editParameter = () => {};
  let incrementParameter = () => {};
  let decrementParameter = () => {};

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
