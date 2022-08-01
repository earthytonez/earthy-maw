import React from 'react';

import { observer } from "mobx-react-lite";

import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";

import { LOTS_OF_RETRO_COLORS } from "../../config/colors";

const NUM_CIRCLES = 6;
const NUM_COLORS = 13;

var murmur = require("murmurhash-js");

interface IUniqueColorsProps {
  name: string;
}

const UniqueColors = observer(({ name }: IUniqueColorsProps): React.ReactElement => {
  let murmurHash = murmur(name);
  let uniqueVal = murmurHash % Math.pow(NUM_COLORS, NUM_CIRCLES);
  let digits: number[] = [];
  for (let i = 0; i <= 5; i++) {
    let digit = uniqueVal % 6;
    uniqueVal = Math.floor(uniqueVal / 13);
    digits.push(digit);
  }
  return (
    <Box>
      {digits.map((digit: number, i: number) => {
        return (
          <CircleIcon
            key={i}
            sx={{ color: LOTS_OF_RETRO_COLORS[digit], ml: i === 0 ? 0 : -2 }}
          />
        );
      })}
    </Box>
  );
});

export default UniqueColors;