import * as React from "react";

import { observer } from "mobx-react-lite";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Track from "../../Objects/Track";

import DroppableTrackElement from "./DroppableTrackElement";
import TrackSettingsComponent from './TrackSettingsComponent';

interface TrackComponentProps {
  track: Track;
}

const TrackComponent = observer(({ track }: TrackComponentProps) => {
  return (
      <Grid item xs={12} sx={{ margin: 0, padding: 0 }}>
        <Grid container>
          <Grid item sx={{ pl: 2, width: "15%", height: "100%" }}>
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
          <Grid item
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

          <Grid item
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
        </Grid>
        <Divider sx={{ m: 0 }} />
      </Grid>
  );
});

export default TrackComponent;
