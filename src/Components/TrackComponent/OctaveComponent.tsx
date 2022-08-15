import React from "react";

import { observer } from "mobx-react-lite";
import TrackOctaves from "../../Objects/Track/TrackOctaves";
import Chip from "@mui/material/Chip";

interface OctaveComponentProps {
  trackOctave: TrackOctaves;
}

const OctaveComponent = observer(
  ({ trackOctave }: OctaveComponentProps) => {
    let { octaves, toggleOctave } = trackOctave;
    let allOctaves: number[] = [1, 2, 3, 4, 5, 6, 7, 8];    

    function handleSelectionChanged(octave: number) {
        toggleOctave(octave);
    }
    
    return (
      <React.Fragment>
        {allOctaves.map((octave: number) => (
          <Chip 
            style={{borderRadius: 0, marginRight: 1, width: 32, height: 32}}
            label={octave}
            key={octave}
            onClick={() => handleSelectionChanged(octave)}
            variant={octaves.includes(octave) ? "filled" : "outlined"}
          />
        ))}
      </React.Fragment>
    );
  }
);

export default OctaveComponent;
