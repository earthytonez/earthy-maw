import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

interface IArraySelectorComponentProps {
  incrementValue: Function;
  decrementValue: Function;
  setValue: Function;
  currentValue: number;
  selectableValues: number[];
}

const ArraySelectorComponent = observer(
  ({
    incrementValue,
    decrementValue,
    setValue,
    currentValue,
    selectableValues,
  }: IArraySelectorComponentProps) => {
    if (!selectableValues) {
      return <Box></Box>;
    }
    console.log(currentValue);
    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button
          variant="outlined"
          size="small"
          onClick={incrementValue}
        >
          -
        </Button>

        {selectableValues.map((value, i) => {
          return (
            <Button
              key={i}
              onClick={() => setValue(value)}
              variant={currentValue === value ? "contained" : "outlined"}
            >
              {value}
            </Button>
          );
        })}
        <Button
          variant="outlined"
          size="small"
          onClick={decrementValue}
        >
          +
        </Button>
      </ButtonGroup>
    );
  }
);

export default ArraySelectorComponent;
