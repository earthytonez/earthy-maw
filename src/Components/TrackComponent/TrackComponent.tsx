import * as React from "react";

import { observer } from "mobx-react-lite";
import { Droppable } from "react-beautiful-dnd";

import Button from "@mui/material/Button";

import CircleIcon from "@mui/icons-material/Circle";
import LaunchIcon from "@mui/icons-material/Launch";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";

import { LOTS_OF_RETRO_COLORS } from "../../config/colors";

import Track from "../../Objects/Track";

import TrackSettingsComponent from './TrackSettingsComponent';
import { useUIStore } from "../../stores/UI/useUIStore";

var murmur = require("murmurhash-js");

interface TrackComponentProps {
  track: Track;
}

interface UniqueColorsProps {
  name: string;
}

const UniqueColors = observer(({ name }: UniqueColorsProps) => {
  console.log(name);
  let murmurHash = murmur(name);
  let NUM_CIRCLES = 6;
  let NUM_COLORS = 13;
  let uniqueVal = murmurHash % Math.pow(NUM_COLORS, NUM_CIRCLES);
  let digits = [];
  for (let i = 0; i <= 5; i++) {
    let digit = uniqueVal % 6;
    uniqueVal = Math.floor(uniqueVal / 13);
    digits.push(digit);
  }
  return (
    <Box>
      {digits.map((digit: number, i: number) => {
        return (
          <CircleIcon key={i} sx={{ color: LOTS_OF_RETRO_COLORS[digit], ml: i == 0 ? 0 : -2 }} />
        );
      })}
    </Box>
  );
});

interface PresetsProps {}

const Presets = observer(({}: PresetsProps) => {
  return <div></div>;
});

interface DroppableTrackElementProps {
  title: string;
  slug: string;
  placeholder: string;
  track_id: number;
  machine: any;
}

const MachinePlaceholder = observer(
  ({ placeholder, title }: { placeholder: string; title: string }) => {
    return (
      <Box>
        <Box>{placeholder}</Box>
        <Box>
          <Button variant="outline">
            <OpenInBrowserOutlinedIcon />
          </Button>
        </Box>
      </Box>
    );
  }
);

const DroppableTrackElement = observer(
  ({
    track_id,
    machine,
    title,
    slug,
    placeholder,
  }: DroppableTrackElementProps) => {
    const uiStore = useUIStore();
    const { toggleObjectEdit } = uiStore;
    return (
      <Droppable
        index={track_id + 11}
        droppableId={`track-${track_id}-${slug}`}
      >
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            row
            variant="outlined"
            sx={{
              minWidth: "90%",
              minHeight: "100%",
              borderRadius: 0,
              gap: 0,
              borderTop: 0,
              borderBottom: 0,
              bgcolor: "background.body",
            }}
          >
            <CardOverflow></CardOverflow>
            <CardContent sx={{ pl: 2 }}>
              <Box>
                {machine &&
                machine.name !== "" &&
                machine.name !== undefined ? (
                  <Box>
                    <Box>
                      <Typography
                        fontWeight="md"
                        textColor="success.plainColor"
                        mb={0.5}
                      >
                        {machine.name}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        aria-label={`edit ${machine.name}`}
                        variant="plain"
                        size="sm"
                        sx={{
                          position: "absolute",
                          top: "1rem",
                          right: "2rem",
                        }}
                        onClick={() =>
                          toggleObjectEdit(true, track_id, slug, machine.slug)
                        }
                      >
                        <LaunchIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ) : machine && machine.loading ? (
                  "Loading..."
                ) : (
                  <MachinePlaceholder placeholder={placeholder} title={title} />
                )}

                {provided.placeholder}
              </Box>
              {machine && machine.name !== "" ? (
                <UniqueColors name={`${machine.machineType}${machine.name}`} />
              ) : (
                ""
              )}
              <Presets />
            </CardContent>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.2,
                borderRadius: 0,
                writingMode: "vertical-rl",
                textAlign: "center",
                fontSize: "xs2",
                fontWeight: "xl2",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {title}
            </CardOverflow>
          </Card>
        )}
      </Droppable>
    );
  }
);

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
