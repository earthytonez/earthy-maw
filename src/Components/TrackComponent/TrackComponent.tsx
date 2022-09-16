import * as React from "react";

import { observer } from "mobx-react-lite";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import Track from "../../Objects/Track";

import DroppableTrackElement from "./MachineComponent/DroppableTrackElement";
import TrackSettingsComponent from "./TrackSettings/TrackSettingsComponent";

interface TrackComponentProps {
  track: Track;
}

const TrackComponent = observer(({ track }: TrackComponentProps): React.ReactElement => {
  return (
    <Grid container direction="row" spacing={2} p={2} style={{backgroundColor: "#333", marginTop: '3px', padding: 0, paddingLeft: '1em', paddingTop: '0', maxHeight: "8rem"}}>
      <Grid
        item
        p={0}
        style={{paddingTop: '6px', paddingBottom: '6px', height: '7rem', maxHeight: '7rem'}}
        sx={{
          margin: 0,
          pt: 0,
          pb: 0,
          mb: 0,
          pl: 0,
          width: "20%",
          height: "100%",
        }}
      >
        <TrackSettingsComponent track={track} />
      </Grid>
      {/* <Grid
            sx={{
              margin: 0,
              pt: 0,
              pb: 0,
              mb: 0,
              pl: 0,
              width: "20%",
              height: "100%",
            }}
          >
            <DroppableTrackElement
              track_id={track.id}
              machine={track.arranger}
              slug="arranger"
              title="Arranger"
              placeholder="Drop Arranger Here"
            ></DroppableTrackElement>
          </Grid> */}
      <Grid
        item
        style={{paddingTop: '6px', paddingBottom: '6px', height: '7rem', maxHeight: '7rem'}}
        sx={{
          margin: 0,
          pt: 0,
          pb: 0,
          mb: 0,
          pl: 0,
          width: "20%",
          height: "100%",
        }}
      >
        <DroppableTrackElement
          track_id={track.id}
          machine={track.sequencer}
          slug="sequencer"
          title="Sequencer"
          placeholder="Drop Sequencer Here"
        ></DroppableTrackElement>
      </Grid>

      <Grid
        item
        style={{paddingTop: '6px', paddingBottom: '6px', height: '7rem', maxHeight: '7rem'}}
        sx={{
          margin: 0,
          pt: 0,
          pb: 0,
          mb: 0,
          pl: 0,
          width: "20%",
          height: "100%",
        }}
      >
        <DroppableTrackElement
          track_id={track.id}
          machine={track.synthesizer}
          slug="synthesizer"
          title="Synthesizer"
          placeholder="Drop Synthesizer Here"
        ></DroppableTrackElement>
      </Grid>
      <Divider sx={{ m: 0 }} />
    </Grid>
  );
});

export default TrackComponent;
