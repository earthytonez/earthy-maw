import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import MachineEditDrawerRadioGroup from "./MachineEditDrawerRadioGroup";
import MachineEditDrawerDial from "./MachineEditDrawerDial";


import ArraySelectorComponent from "./ArraySelectorComponent";

interface ILoadParameterParams {
    edit: Function;
    increment: Function;
    decrement: Function;
    name: string;
    field: string;
    fieldType: string;
    fieldOptions: any;
  }

export default observer(
    ({
      edit,
      name,
      field,
      fieldType,
      fieldOptions,
      increment,
      decrement,
    }: ILoadParameterParams): React.ReactElement => {
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
            <Box sx={{ width: 1 }}>
              <Typography id="track-false-slider" gutterBottom>
                {name}
              </Typography>
              <Slider
                aria-label={name}
                defaultValue={fieldOptions.current}
                getAriaValueText={() => fieldOptions.current}
                step={1}
                marks
                onChange={(mouseEvent: any) =>
                  edit(field, mouseEvent.target.value)
                }
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
                setValue={(value: any) => edit(field, value)}
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
  