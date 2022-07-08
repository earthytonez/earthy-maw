import { observer } from "mobx-react-lite";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";


import Track from "./Objects/Track.ts";
import TrackComponent from "./TrackComponent.tsx";


import { useStore } from '../../stores/useStore.tsx';

const grid = 8;

interface TrackListComponentProps {
  tracks: Array<Track>;
}

const TrackListComponent = observer((props: TrackListComponentProps) => {
  const stores = useStore();
  let tracks = stores.trackStore.tracks;
  return (
    <div>
<Grid container spacing={2}>
      {tracks.map((track: Track, i: number) => (
            <TrackComponent key={i} track={track}></TrackComponent>
        ))}
    </Grid>
    <Button variant="outlined" onClick={stores.trackStore.addTrack}>Add Track</Button>
    </div>
  );
});

export default TrackListComponent