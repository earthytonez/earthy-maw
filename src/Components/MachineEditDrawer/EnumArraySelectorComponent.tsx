import React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface IEnumSelectorComponentProps {
  selectableValues: Array<string | number>;
  setValue: Function;
  currentValue: Array<string | number>;
}

const EnumArraySelectorComponent = observer(
  ({
    setValue,
    currentValue,
    selectableValues,
  }: IEnumSelectorComponentProps): React.ReactElement => {
    if (!selectableValues) {
      return <Box></Box>;
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    const [openID, setOpenID] = React.useState(0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenID(parseInt(event.currentTarget.id));
      setOpen(true);
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setOpen(false);
      setAnchorEl(null);
    };

    console.log(currentValue);
    console.log(selectableValues);

    return (
      <Grid container>
        {currentValue.map((value: number | string, i: number) => {
          return (
            <React.Fragment key={i}>
              {/* <Grid item xs={1}>
                <Button onClick={incrementValue}>+ </Button>
              </Grid> */}
              <Grid item xs={3}>
                <Button id={i.toString()} onClick={handleClick}>
                  {i}. {value}
                </Button>
              </Grid>
              {/* <Grid item xs={1}>
                <Button key={i} onClick={decrementValue}>
                  -{" "}
                </Button>
              </Grid> */}
            </React.Fragment>
          );
        })}
        <Menu
          id="enum-array-selector-basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {selectableValues.map((value: string | number, j: number) => {
            return (
              <MenuItem
                onClick={() => {
                  console.log(openID);
                  let newArray = currentValue;
                  newArray[openID] = value;
                  setValue(newArray);
                  handleClose();
                }}
                key={j}
              >
                {value}
              </MenuItem>
            );
          })}
        </Menu>
      </Grid>
    );
  }
);

export default EnumArraySelectorComponent;
