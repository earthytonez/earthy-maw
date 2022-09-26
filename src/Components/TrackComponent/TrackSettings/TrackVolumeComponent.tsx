import * as React from "react";
import { observer } from "mobx-react-lite";

import Slider from "@mui/material/Slider";

import TrackVolume from "../../../stores/Track/TrackVolume";

interface VolumeComponentProps {
  trackVolume: TrackVolume;
}

const VolumeComponent = observer(
  ({ trackVolume }: VolumeComponentProps): React.ReactElement => {
    // const store = useStore();
    const { volume, setVolume } = trackVolume;

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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
);

export default VolumeComponent;
