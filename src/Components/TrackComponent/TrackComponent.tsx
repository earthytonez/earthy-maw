import * as React from "react";

import { observer } from "mobx-react-lite";

import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";

import Track from "../../Objects/Track";

import DroppableTrackElement from "./DroppableTrackElement";
import TrackSettingsComponent from './TrackSettingsComponent';
import { useUIStore } from "../../stores/UI/useUIStore";

interface TrackComponentProps {
  track: Track;
}

const TrackComponent = observer(({ track }: TrackComponentProps) => {
  return (
    <Box>
      <ListItem sx={{ margin: 0, padding: 0 }}>
        <List row>
          <ListItem sx={{ pl: 2, width: "15%", height: "100%" }}>
            <TrackSettingsComponent track={track} />
          </ListItem>
          <ListItem
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
          </ListItem>
          <ListItem
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
          </ListItem>

          <ListItem
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
          </ListItem>
        </List>
      </ListItem>
      <ListDivider sx={{ m: 0 }} />
    </Box>
  );
});

export default TrackComponent;
