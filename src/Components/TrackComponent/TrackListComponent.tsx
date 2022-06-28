// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";

import Track from "./Objects/Track.ts";
import TrackComponent from "./TrackComponent.tsx";

import { observer } from "mobx-react-lite";

import List from '@mui/joy/List';

const grid = 8;

interface TrackListComponentProps {
  tracks: Array<Track>;
}

const TrackListComponent = observer((props: TrackListComponentProps) => {
  const { tracks } = props;
  return (
    <List>
      {tracks.map((track: Track, i: number) => (
            <TrackComponent key={i} track={track}></TrackComponent>
        ))}
    </List>
  );
});

export default TrackListComponent