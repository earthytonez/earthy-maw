import Button from "@mui/joy/Button";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";

import Track from "./Objects/Track.ts";
import TrackComponent from "./TrackComponent.tsx";

import { observer } from "mobx-react-lite";

import List from '@mui/joy/List';

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
    <List>
      {tracks.map((track: Track, i: number) => (
            <TrackComponent key={i} track={track}></TrackComponent>
        ))}
    </List>
    <Button variant="solid" onClick={stores.trackStore.addTrack}>Add Track</Button>
    </div>
  );
});

export default TrackListComponent