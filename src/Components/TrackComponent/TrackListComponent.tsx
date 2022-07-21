import { observer } from "mobx-react-lite";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Track from "./Objects/Track";
import TrackComponent from "./TrackComponent";

import { useStore } from "../../stores/useStore";
import React from "react";

const grid = 8;

interface TrackListComponentProps {
  tracks: Array<Track>;
}

const TrackListComponent = observer((props: TrackListComponentProps) => {
  const stores = useStore();
  let tracks = stores.trackStore.tracks;
  return (
    <React.Fragment>
      <Grid container spacing={0} direction="column">
        {tracks.map((track: Track, i: number) => (
          <React.Fragment key={i}>
            <TrackComponent track={track}></TrackComponent>
            <Divider light />
          </React.Fragment>
        ))}
      </Grid>
      <Button variant="outlined" onClick={stores.trackStore.addTrack}>
        Add Track
      </Button>
    </React.Fragment>
  );
});

export default TrackListComponent;
