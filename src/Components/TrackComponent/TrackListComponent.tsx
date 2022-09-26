import { observer } from "mobx-react-lite";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import Track from "../../stores/Track";
import TrackComponent from "./TrackComponent";

import { useStore } from "../../stores/useStore";
import React from "react";

interface TrackListComponentProps {}

const TrackListComponent = observer((_props: TrackListComponentProps) => {
  const stores = useStore();
  let tracks = stores.trackStore.tracks;
  return (
    <React.Fragment>
      <Grid container spacing={1} direction="column">
        {tracks.map((track: Track, i: number) => (
          <React.Fragment key={i}>
            <TrackComponent track={track}></TrackComponent>
            <Divider light />
          </React.Fragment>
        ))}
      </Grid>
      <Grid container spacing={0} direction="column">
        <Grid
          container
          direction="row"
          spacing={2}
          p={2}
          style={{
            marginTop: "3px",
            padding: 0,
            paddingLeft: "1em",
            paddingTop: "0",
            height: "40vh",
            maxHeight: "40vh",
          }}
        >
          <Grid
            container
            p={0}
            style={{ paddingTop: "8px", height: "40vh", maxHeight: "40vh" }}
            sx={{
              backgroundColor: "#333",
              margin: 0,
              pt: 20,
              pb: 0,
              mb: 0,
              pl: 0,
              justifyContent: "center",
              width: "20%",
              height: "100%",
            }}
          >
            <Grid item xs={5} sx={{ mt: '10px'}}>
              <Button color="secondary" variant="outlined" onClick={stores.trackStore.addTrack} size="large">
                Add Track
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            p={0}
            style={{ paddingTop: "8px", height: "4rem", maxHeight: "4rem" }}
            sx={{
              margin: 0,
              pt: 0,
              pb: 0,
              mb: 0,
              pl: 0,
              width: "80%",
              height: "100%",
            }}
          ></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

export default TrackListComponent;
