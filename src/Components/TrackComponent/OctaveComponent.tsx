import React from "react";

import { observer } from "mobx-react-lite";

import Chip from "@mui/material/Chip";

interface OctaveComponentProps {
  octaves: number[];
  toggleOctave: (a: number) => void;
}

const OctaveComponent = observer(
  ({ octaves, toggleOctave }: OctaveComponentProps) => {
    // const store = useStore();

    let allOctaves: number[] = [1, 2, 3, 4, 5, 6, 7, 8];    

    function handleSelectionChanged(octave: number) {
        toggleOctave(octave);
    }

    console.log(octaves);
    return (
      <React.Fragment>
        {allOctaves.map((octave: number) => (
          <Chip 
            style={{borderRadius: 0, marginRight: 1}}
            label={octave}
            key={octave}
            onClick={() => handleSelectionChanged(octave)}
            variant={octaves.includes(octave) ? "filled" : "outlined"}
          />
        ))}
      </React.Fragment>
    );

    //   return (
    //     <Box sx={{ width: "200px" }}>
    //       <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
    //         <Slider
    //           aria-label="Custom marks"
    //           defaultValue={volume}
    //           getAriaValueText={valueText}
    //           step={1}
    //           onChange={(ev, value) => setVolume(value)}
    //           valueLabelDisplay="auto"
    //           min={-100}
    //           max={6}
    //           marks={marks}
    //         />
    //         <Button
    //           variant={muted ? "contained" : "outlined"}
    //           size="small"
    //           onClick={track.toggleMute}
    //         >
    //           M
    //         </Button>
    //       </Stack>
    //     </Box>
    //   );
  }
);

export default OctaveComponent;
