import * as React from "react";
import { observer } from "mobx-react-lite";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MenuIcon from "@mui/icons-material/Menu";


import Track from "../../Objects/Track";

import Menu from './TrackSettingsMenu';

interface VolumeComponentProps {
  track: Track;
  raiseVolume: () => null;
  lowerVolume: () => null;
  toggleMute: () => null;
}

const VolumeComponent = observer(
  ({ track }: VolumeComponentProps) => {
    // const store = useStore();
    const { volume, muted } = track;
    console.log(muted);
    
    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button variant="outlined" size="small" onClick={track.raiseVolume}>
          +
        </Button>
        <Button variant="contained" disabled>
          {Math.round(track.volume)}
        </Button>
        <Button variant="outlined" size="small" onClick={track.lowerVolume}>
          -
        </Button>
        <Button variant={muted ? "contained" : "outlined"} size="small" onClick={track.toggleMute}>
          Mute
        </Button>
      </ButtonGroup>
    );
  }
);

interface ITrackSettingsComponentProps {
  track: Track;
}

const TrackSettingsComponent = observer(({ track }: ITrackSettingsComponentProps) => {
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
