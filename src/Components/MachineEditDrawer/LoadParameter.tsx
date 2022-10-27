import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import MachineEditDrawerRadioGroup from "./MachineEditDrawerRadioGroup";
import MachineEditDrawerDial from "./MachineEditDrawerDial";

import SliderParameter from "./ParameterComponents/SliderParameter";

import ArraySelectorComponent from "./ArraySelectorComponent";
import EnumArraySelectorComponent from "./EnumArraySelectorComponent";
import NumericArraySelectorComponent from "./NumericArraySelectorComponent";
import { ParameterFieldTypes } from "stores/Parameter/Base";
import GridMiddleFullWidth from "Components/TightBorderedGrid/GridMiddleFullWidth";

interface ILoadParameterParams {
  edit: Function;
  increment: Function;
  decrement: Function;
  name: string;
  field: string;
  parameterValue: any;
  fieldType: ParameterFieldTypes;
  fieldOptions: any;
  style: any;
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
    parameterValue,
    style,
  }: ILoadParameterParams): React.ReactElement => {
    console.log(fieldType);
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
          <SliderParameter
            min={fieldOptions.min}
            max={fieldOptions.max}
            edit={edit}
            field={field}
            name={name}
            style={style}
            parameterValue={parameterValue}
          />
        );
      case "arraySelector":
        return (
          <Grid container sx={{ mr: 0, ml: 0, pr: 0, pl: 0 }}>
            <GridMiddleFullWidth>
              <Typography
                style={{ fontFamily: "Source Code Pro" }}
                id="track-false-slider"
                gutterBottom
              >
                {name}
              </Typography>
            </GridMiddleFullWidth>
            <GridMiddleFullWidth>
              <ArraySelectorComponent
                aria-label={name}
                selectableValues={fieldOptions.options}
                currentValue={parameterValue}
                setValue={(value: any) => edit(field, value)}
                incrementValue={() => increment(field)}
                decrementValue={() => decrement(field)}
              />
            </GridMiddleFullWidth>
          </Grid>
        );
      case "enumArraySelector":
        return (
          <Grid container sx={{ mr: 0, ml: 0, pr: 0, pl: 0 }}>
            <GridMiddleFullWidth>
              <Typography
                style={{ fontFamily: "Source Code Pro" }}
                id="track-false-slider"
                gutterBottom
              >
                {name}
              </Typography>
            </GridMiddleFullWidth>
            <GridMiddleFullWidth>
              <EnumArraySelectorComponent
                aria-label={name}
                selectableValues={fieldOptions.options}
                currentValue={parameterValue}
                setValue={(value: any) => edit(field, value)}
              />
            </GridMiddleFullWidth>
          </Grid>
        );
      case "numericArraySelector":
        return (
          <Grid container sx={{ mr: 0, ml: 0, pr: 0, pl: 0 }}>
            <GridMiddleFullWidth>
              <Typography
                style={{ fontFamily: "Source Code Pro" }}
                id="track-false-slider"
                gutterBottom
              >
                {name}
              </Typography>
            </GridMiddleFullWidth>
            <GridMiddleFullWidth>
              <NumericArraySelectorComponent
                aria-label={name}
                currentValue={parameterValue}
                setValue={(value: any) => edit(field, value)}
                // incrementValue={() => increment(field)}
                // decrementValue={() => decrement(field)}
                min={fieldOptions.min}
                max={fieldOptions.max}
              />
            </GridMiddleFullWidth>
          </Grid>
        );

      default:
        return <Box></Box>;
    }
  }
);
