import React from "react";

import { observer } from "mobx-react-lite";
import TrackOctaves from "../../../stores/Track/TrackOctaves";
import FullGridButton from "../../TightBorderedGrid/FullGridButton";
import GridBottomMiddle from "../../TightBorderedGrid/GridBottomMiddle";

interface OctaveComponentProps {
  trackOctave: TrackOctaves;
}

const OctaveComponent = observer(({ trackOctave }: OctaveComponentProps) => {
  let { octaves, toggleOctave } = trackOctave;
  let allOctaves: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  function handleSelectionChanged(octave: number) {
    toggleOctave(octave);
  }

  if (!octaves) {
    console.warn("octaves should never be undefined");
    <React.Fragment>
      {allOctaves.map((octave: number) => (
        <GridBottomMiddle item xs={1.5} key={octave} sx={{ p: 0 }}>
          <FullGridButton onClick={() => handleSelectionChanged(octave)}>
            {octave}
          </FullGridButton>
        </GridBottomMiddle>
      ))}
    </React.Fragment>;
  }


  return (
    <React.Fragment>
      {allOctaves.map((octave: number) => (
        <GridBottomMiddle item xs={1.5} key={octave} sx={{ p: 0 }}>
          <FullGridButton variant={octaves.includes(octave) ? "contained" : "outlined"} size="small" onClick={() => handleSelectionChanged(octave)}>
            {octave}
          </FullGridButton>
        </GridBottomMiddle>
      ))}
    </React.Fragment>
  );
});

export default OctaveComponent;
