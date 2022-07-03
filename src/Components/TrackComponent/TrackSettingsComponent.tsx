import * as React from "react";
import Track from "../../Objects/Track.ts";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

import { LOTS_OF_RETRO_COLORS } from "../../config/colors.ts";
import { observer } from "mobx-react-lite";

import { Droppable } from "react-beautiful-dnd";

import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";

import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";

import MenuIcon from "@mui/icons-material/Menu";

import { useUIStore } from "../../stores/UI/useUIStore.tsx";
import Menu from "./TrackSettingsMenu";

var murmur = require("murmurhash-js");

interface TrackSettingsComponentProps {
  track: Track;
}

interface VolumeComponentProps {
  track: Track;
  raiseVolume: () => null;
  lowerVolume: () => null;
  toggleMute: () => null;
}

const VolumeComponent = observer(
  ({ track, raiseVolume, lowerVolume, toggleMute }: VolumeComponentProps) => {
    // const store = useStore();
    const { volume } = track;

    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button variant="outlined" size="small" onClick={raiseVolume}>
          +
        </Button>
        <Button variant="outlined" disabled>
          {Math.round(volume)}
        </Button>
        <Button variant="outlined" size="small" onClick={lowerVolume}>
          -
        </Button>
        <Button variant="outlined" size="small" onClick={track.toggleMute}>
          Mute
        </Button>
      </ButtonGroup>
    );
  }
);

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
          <CircleIcon key={i} sx={{ color: LOTS_OF_RETRO_COLORS[digit] }} />
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

const TrackSettingsComponent = observer(({ track }: TrackComponentProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography
          textColor="neutral.500"
          fontWeight={700}
          sx={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: ".1rem",
          }}
        >
          Track {track.id + 1}
        </Typography>
      </Box>
      <Box>
        <VolumeComponent
          track={track}
          raiseVolume={track.raiseVolume}
          lowerVolume={track.lowerVolume}
        />
      </Box>
      <Box>
        <Menu
          id="app-selector"
          control={
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              aria-label="Apps"
            >
              <MenuIcon />
            </IconButton>
          }
          menus={[
            {
              label: "Delete",
              onClick: () => { track.remove() }
            },
          ]}
        />
      </Box>
    </Box>
  );
});

export default TrackSettingsComponent;
