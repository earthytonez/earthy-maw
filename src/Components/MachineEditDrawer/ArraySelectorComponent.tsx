import React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface IArraySelectorComponentProps {
  incrementValue: React.MouseEventHandler<HTMLButtonElement>;
  decrementValue: React.MouseEventHandler<HTMLButtonElement>;
  setValue: Function;
  currentValue: number;
  selectableValues: number[];
}

const ArraySelectorComponent = observer(
  ({
    setValue,
    currentValue,
    selectableValues,
  }: IArraySelectorComponentProps): React.ReactElement => {
    if (!selectableValues) {
      return <Box></Box>;
    }

    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentValue}
        onChange={(ev: any) => {
          setValue(ev.target.value);
        }}
      >
        {selectableValues.map((value, i) => {
          return (
            <MenuItem key={i} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    );

    // return (
    //   <ButtonGroup size="small" aria-label="small outlined button group">
    //     <Button variant="outlined" size="small" onClick={incrementValue}>
    //       -
    //     </Button>

    //     {selectableValues.map((value, i) => {
    //       return (
    //         <Button
    //           key={i}
    //           onClick={() => setValue(value)}
    //           variant={currentValue === value ? "contained" : "outlined"}
    //         >
    //           {value}
    //         </Button>
    //       );
    //     })}
    //     <Button variant="outlined" size="small" onClick={decrementValue}>
    //       +
    //     </Button>
    //   </ButtonGroup>
    // );
  }
);

export default ArraySelectorComponent;
