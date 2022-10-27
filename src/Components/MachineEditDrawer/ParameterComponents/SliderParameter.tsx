import * as React from "react";

import { observer } from "mobx-react-lite";

import GridTopFullWidth from "Components/TightBorderedGrid/GridTopFullWidth";
import GridMiddleFullWidth from "Components/TightBorderedGrid/GridMiddleFullWidth";

import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

interface ISliderParameterParams {
  edit: Function;
  field: any;
  min: number;
  max: number;
  name: string;
  parameterValue: number;
  style: any;
}

export default observer(
  ({
    edit,
    field,
    min,
    max,
    name,
    parameterValue,
    style,
  }: ISliderParameterParams): React.ReactElement => {
    let step = 10;
    if (max - min < 1000) {
      step = 10;
    }
    if (max - min < 100) {
      step = 1;
    }
    if (max - min < 10) {
      step = 0.1;
    }

    console.log(`STYLE: ${style}`);
    if (style) {
      console.log(`STYLE_ORIENTATION: ${style.orientation}`);
    }

    if (style && style.orientation == "vertical") {
      return (
        <Grid xs={3} sx={{ height: "300px" }}>
          <Grid container sx={{ mr: 0, ml: 0, pr: 0, pl: 0 }}>
            <GridTopFullWidth sx={{ width: 1 }}>
              <Typography
                style={{ fontFamily: "Source Code Pro" }}
                id="track-false-slider"
                gutterBottom
              >
                {name} - {parameterValue}
              </Typography>
            </GridTopFullWidth>
            <GridMiddleFullWidth sx={{ width: 1 }}>
              <Slider
                aria-label={name}
                defaultValue={parameterValue}
                // getAriaValueText={() => parameterValue}
                step={step}
                orientation={(style && style.orientation) || "horizontal"}
                marks
                onChange={(mouseEvent: any) => {
                  edit(field, mouseEvent.target.value);
                }}
                min={min}
                max={max}
                valueLabelDisplay="auto"
                sx={{ height: "200px" }}
              />
            </GridMiddleFullWidth>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container sx={{ mr: 0, ml: 0, pr: 0, pl: 0 }}>
        <GridTopFullWidth sx={{ width: 1 }}>
          <Typography
            style={{ fontFamily: "Source Code Pro" }}
            id="track-false-slider"
            gutterBottom
          >
            {name} - {parameterValue}
          </Typography>
        </GridTopFullWidth>
        <GridMiddleFullWidth sx={{ width: 1 }}>
          <Slider
            aria-label={name}
            defaultValue={parameterValue}
            // getAriaValueText={() => parameterValue}
            step={step}
            orientation={(style && style.orientation) || "horizontal"}
            marks
            onChange={(mouseEvent: any) => {
              edit(field, mouseEvent.target.value);
            }}
            min={min}
            max={max}
            valueLabelDisplay="auto"
          />
        </GridMiddleFullWidth>
      </Grid>
    );
  }
);
