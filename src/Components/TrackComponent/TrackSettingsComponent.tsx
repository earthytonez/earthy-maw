import * as React from "react";
import { observer } from "mobx-react-lite";

import Button from "@mui/material/Button";

import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Slider from "@mui/joy/Slider";
import Typography from "@mui/joy/Typography";

import Track from "../../Objects/Track";

import Menu from "./TrackSettingsMenu";

interface VolumeComponentProps {
  track: Track;
  raiseVolume: () => null;
  lowerVolume: () => null;
  setVolume: () => null;
  toggleMute: () => null;
}

const VolumeComponent = observer(({ track }: VolumeComponentProps) => {
  // const store = useStore();
  const { volume, setVolume, muted } = track;
  console.log(muted);

  const marks = [
    {
      value: 0,
      label: "",
    },
    {
      value: 6,
      label: "6db",
    },
    {
      value: -100,
      label: "-60db",
    },
  ];

  function valueText(value: number) {
    return `${value}db`;
  }

  return (
    <Box sx={{ width: "200px" }}>
      <Box>
        <Slider
          aria-label="Custom marks"
          defaultValue={volume}
          getAriaValueText={valueText}
          step={1}
          onChange={(ev, value) => setVolume(value)}
          valueLabelDisplay="auto"
          min={-100}
          max={6}
          marks={marks}
        />
      </Box>
      <Box>
        <Button
          variant={muted ? "contained" : "outlined"}
          size="small"
          onClick={track.toggleMute}
        >
          Mute
        </Button>
      </Box>
    </Box>
  );
});

interface ITrackSettingsComponentProps {
  track: Track;
}

const TrackSettingsComponent = observer(
  ({ track }: ITrackSettingsComponentProps) => {
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
                aria-label="Apps"
              >
                <MenuIcon />
              </IconButton>
            }
            menus={[
              {
                label: "Delete",
                onClick: () => {
                  track.remove();
                },
              },
            ]}
          />
        </Box>
      </Box>
    );
  }
);

export default TrackSettingsComponent;

// const DroppableTrackElement = observer(
//   ({
//     track_id,
//     machine,
//     title,
//     slug,
//     placeholder,
//   }: DroppableTrackElementProps) => {
//     const uiStore = useUIStore();
//     const { toggleObjectEdit } = uiStore;
//     return (
//       <Droppable
//         index={track_id + 11}
//         droppableId={`track-${track_id}-${slug}`}
//       >
//         {(provided, snapshot) => (
//           <Card
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             row
//             variant="outlined"
//             sx={{
//               minWidth: "90%",
//               minHeight: "100%",
//               borderRadius: 0,
//               gap: 0,
//               borderTop: 0,
//               borderBottom: 0,
//               bgcolor: "background.body",
//             }}
//           >
//             <CardOverflow></CardOverflow>
//             <CardContent sx={{ pl: 2 }}>
//               <Box>
//                 {machine &&
//                 machine.name !== "" &&
//                 machine.name !== undefined ? (
//                   <Box>
//                     <Box>
//                       <Typography
//                         fontWeight="md"
//                         textColor="success.plainColor"
//                         mb={0.5}
//                       >
//                         {machine.name}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <IconButton
//                         aria-label={`edit ${machine.name}`}
//                         variant="plain"
//                         size="sm"
//                         sx={{
//                           position: "absolute",
//                           top: "1rem",
//                           right: "2rem",
//                         }}
//                         onClick={() =>
//                           toggleObjectEdit(true, track_id, slug, machine.slug)
//                         }
//                       >
//                         <LaunchIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 ) : machine && machine.loading ? (
//                   "Loading..."
//                 ) : (
//                   <MachinePlaceholder placeholder={placeholder} title={title} />
//                 )}

//                 {provided.placeholder}
//               </Box>
//               {machine && machine.name !== "" ? (
//                 <UniqueColors name={`${machine.machineType}${machine.name}`} />
//               ) : (
//                 ""
//               )}
//               <Presets />
//             </CardContent>
//             <CardOverflow
//               variant="soft"
//               color="primary"
//               sx={{
//                 px: 0.2,
//                 borderRadius: 0,
//                 writingMode: "vertical-rl",
//                 textAlign: "center",
//                 fontSize: "xs2",
//                 fontWeight: "xl2",
//                 letterSpacing: "1px",
//                 textTransform: "uppercase",
//               }}
//             >
//               {title}
//             </CardOverflow>
//           </Card>
//         )}
//       </Droppable>
//     );
//   }
// );

// interface PresetsProps {}

// const Presets = observer(({}: PresetsProps) => {
//   return <div></div>;
// });

// interface DroppableTrackElementProps {
//   title: string;
//   slug: string;
//   placeholder: string;
//   track_id: number;
//   machine: any;
// }

// const MachinePlaceholder = observer(
//   ({ placeholder, title }: { placeholder: string; title: string }) => {
//     return (
//       <Box>
//         <Box>{placeholder}</Box>
//         <Box>
//           <Button variant="outline">
//             <OpenInBrowserOutlinedIcon />
//           </Button>
//         </Box>
//       </Box>
//     );
//   }
// );
