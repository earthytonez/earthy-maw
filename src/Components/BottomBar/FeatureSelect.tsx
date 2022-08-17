import * as React from "react";

import { observer } from "mobx-react-lite";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface FeatureSelectProps {
    title: string
    slug: string
    value: string
    change: (val: any) => void
    options: string[]
}

export default observer((props: FeatureSelectProps): React.ReactElement => {
    const { title, slug, value, change, options } = props;

    return (<React.Fragment><InputLabel id={`${slug}-label`}>{title}</InputLabel>
    <Select
      labelId={`${slug}-label`}
      id={`${slug}-select`}
      value={value}
      label={title}
      onChange={(event) => {
        change(event.target.value);
      }}
    >
      {options.map((selectOption: string, i: number) => {
        return (
          <MenuItem key={i} value={selectOption}>
            {selectOption}
          </MenuItem>
        );
      })}
    </Select></React.Fragment>);
  });
  