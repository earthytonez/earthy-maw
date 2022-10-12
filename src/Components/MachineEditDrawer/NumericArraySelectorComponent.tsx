import React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface IEnumSelectorComponentProps {
  // incrementValue: React.MouseEventHandler<HTMLButtonElement>;
  // decrementValue: React.MouseEventHandler<HTMLButtonElement>;
  setValue: Function;
  currentValue: Array<string | number>;
  min: number;
  max: number;
}

const NumericArraySelectorComponent = observer(
  ({
    setValue,
    currentValue,
    min,
    max,
  }: IEnumSelectorComponentProps): React.ReactElement => {
    if (min === undefined || max === undefined) {
      return <Box></Box>;
    }

    console.log(currentValue);

    return (
      <Grid container>
        {currentValue.map((value: number | string, i: number) => {
          return (
            <React.Fragment key={i}>
              {/* <Grid item xs={1}>
                <Button
                  style={{ padding: 0, width: "10px" }}
                  key={i}
                  onClick={incrementValue}
                >
                  +{" "}
                </Button>
              </Grid> */}
              <Grid item xs={3}>
                <TextField
                  type="number"
                  key={i}
                  value={value}
                  onChange={(a) => {
                    console.log(a.target.value);
                    let newArray = currentValue;
                    newArray[i] = a.target.value;
                    console.log(newArray);
                    setValue(newArray);
                  }}
                />
              </Grid>
              {/* <Grid item xs={1}>
                <Button key={i} onClick={decrementValue}>
                  -{" "}
                </Button>
              </Grid> */}
            </React.Fragment>
          );
        })}
      </Grid>
    );
  }
);

export default NumericArraySelectorComponent;
