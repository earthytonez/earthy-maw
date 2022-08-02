import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import OctaveComponent from "./OctaveComponent";
import Track from "../../Objects/Track";

import Menu from "./TrackSettingsMenu";

import VolumeComponent from "./TrackVolumeComponent";


interface ITrackSettingsComponentProps {
  track: Track;
}

const TrackSettingsComponent = observer(
  ({ track }: ITrackSettingsComponentProps): React.ReactElement => {

    return (
      <Card sx={{ height: "100%", padding: '8px', paddingBottom: '0px' }}>
              <CardContent sx={{ pl: 2, padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: 'relative',
            mb: 0.5,
          }}
        >
          <Typography
            color="neutral.500"
            fontWeight={700}
            sx={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: ".1rem",
            }}
          >
            Track {track.id + 1}
          </Typography>
          <Box sx={{top: 0, right: 0, position: 'absolute'}}>
          <Menu
            id="app-selector"
            control={
              <IconButton
                size="small"
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
        <Box>
          <VolumeComponent
            trackVolume={track.trackFeatures.volume}
          />
        </Box>
        <Box>
          <OctaveComponent octaves={track.octaves} toggleOctave={track.toggleOctave}></OctaveComponent>
        </Box>
        </CardContent>
      </Card>
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
//             <Box sx={{ pl: 2 }}>
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
//                         size="small"
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
//           <Button variant="outlined">
//             <OpenInBrowserOutlinedIcon />
//           </Button>
//         </Box>
//       </Box>
//     );
//   }
// );
