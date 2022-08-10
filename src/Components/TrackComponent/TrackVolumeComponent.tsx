import * as React from "react";
import { observer } from "mobx-react-lite";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TrackVolume from "../../Objects/Track/TrackVolume";

interface VolumeComponentProps {
  trackVolume: TrackVolume;
}

const VolumeComponent = observer(({ trackVolume }: VolumeComponentProps): React.ReactElement => {
  // const store = useStore();
  const { volume, setVolume, muted, toggleMute } = trackVolume;

//   const marks = [
//     {
//       value: 0,
//       label: "",
//     },
//     {
//       value: 6,
//       label: "6db",
//     },
//     {
//       value: -100,
//       label: "-60db",
//     },
//   ];

  function valueText(value: number) {
    return `${value}db`;
  }

  return (
    <Box sx={{ width: "200px" }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Box style={{ border: 0, width: "100%", height: "30px" }}>
          <Slider
            aria-label="Custom marks"
            defaultValue={volume}
            getAriaValueText={valueText}
            step={1}
            onChange={(_ev: any, value: any) => setVolume(value)}
            valueLabelDisplay="auto"
            min={-100}
            max={6}
            // marks={marks}
          />
        </Box>
        <Box style={{ height: "30px", width: "20px", marginLeft: 2 }}>
          <Button
            variant={muted ? "contained" : "outlined"}
            size="small"
            style={{ borderRadius: "0", minWidth: 0, marginLeft: 10 }}
            onClick={toggleMute}
          >
            <Typography>M</Typography>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
});

export default VolumeComponent;
