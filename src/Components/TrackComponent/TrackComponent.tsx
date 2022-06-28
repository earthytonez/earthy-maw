import * as React from "react";
import Track from "../../Objects/Track.ts";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/joy/Button";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";

import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import filesTheme from "../../theme.ts";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";

import { observer } from "mobx-react-lite";

import { Droppable } from "react-beautiful-dnd";

interface TrackComponentProps {
  track: Track;
}

interface VolumeComponentProps {
  track: Track;
  raiseVolume: () => null;
  lowerVolume: () => null;
}

const VolumeComponent = observer(
  ({ track, raiseVolume, lowerVolume }: VolumeComponentProps) => {
    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button variant="solid" onClick={raiseVolume}>
          +
        </Button>
        <Button variant="outlined" disabled>
          {Math.round(track.volume)}
        </Button>
        <Button variant="solid" onClick={lowerVolume}>
          -
        </Button>
      </ButtonGroup>
    );
  }
);

interface DroppableTrackElementProps {
  title: string,
  slug: string,
  placeholder: string,
  track_id: number,
  machine: any,
}

const DroppableTrackElement = observer(({track_id, machine, title, slug, placeholder}: DroppableTrackElementProps) => {
  console.log(machine);
  return (<Droppable
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
        <Typography
          fontWeight="md"
          textColor="success.plainColor"
          mb={0.5}
        >
          {machine && machine.name != '' && machine.name != undefined
            ? machine.name
            : 'Loading...'}
        </Typography>
        {provided.placeholder}
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
</Droppable>);
});

const TrackComponent = observer(({ track }: TrackComponentProps) => {
  return (
    <CssVarsProvider theme={filesTheme}>
      <ListItem sx={{ margin: 0, padding: 0 }}>
        <List row>
          <ListItem sx={{ pl: 2, width: "15%", height: "100%" }}>
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
                  Track {track.id}
                </Typography>
              </Box>
              <Box>
                <VolumeComponent
                  track={track}
                  raiseVolume={track.raiseVolume}
                  lowerVolume={track.lowerVolume}
                />
              </Box>
            </Box>
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
            <DroppableTrackElement track_id={track.id} machine={track.arranger} slug="arranger" title="Arranger" placeholder="Drop Arranger Here"></DroppableTrackElement>
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
            <DroppableTrackElement track_id={track.id} machine={track.sequencer} slug="sequencer" title="Sequencer" placeholder="Drop Sequencer Here"></DroppableTrackElement>
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
            <DroppableTrackElement track_id={track.id} machine={track.synthesizer} slug="synthesizer" title="Synthesizer" placeholder="Drop Synthesizer Here"></DroppableTrackElement>
          </ListItem>

        </List>
      </ListItem>
      <ListDivider sx={{ m: 0 }} />
    </CssVarsProvider>
  );
});

export default TrackComponent;

{
  /* <TableCell align="left"> */
}
// <b>Track {track.id}</b>
// <div></div>
// <VolumeComponent
//   track={track}
//   raiseVolume={track.raiseVolume}
//   lowerVolume={track.lowerVolume}
// />
// </TableCell>
// <Droppable
// index={track.id + 11}
// droppableId={`track-${track.id}-arranger`}
// >
// {(provided, snapshot) => (
//   <TableCell
//     ref={provided.innerRef}
//     {...provided.draggableProps}
//     {...provided.dragHandleProps}
//     align="left"
//     style={{
//       backgroundColor: track.arranger ? "lightcoral" : "white",
//     }}
//   >
//     {track.arranger ? track.arranger.name : "Drop Arranger Here"}
//     {provided.placeholder}
//   </TableCell>
// )}
// </Droppable>
// <Droppable
// index={track.id + 12}
// droppableId={`track-${track.id}-sequencer`}
// >
// {(provided, snapshot) => (
//   <TableCell
//     align="left"
//     ref={provided.innerRef}
//     {...provided.draggableProps}
//     {...provided.dragHandleProps}
//     style={{
//       backgroundColor: track.sequencer ? "lightblue" : "white",
//     }}
//   >
//     {track.sequencer ? track.sequencer.name : "Drop Sequencer Here"}
//     {provided.placeholder}
//   </TableCell>
// )}
// </Droppable>
// <Droppable
// index={track.id + 13}
// droppableId={`track-${track.id}-synthesizer`}
// >
// {(provided, snapshot) => (
//   <TableCell
//     ref={provided.innerRef}
//     {...provided.draggableProps}
//     {...provided.dragHandleProps}
//     align="left"
//     style={{
//       backgroundColor: track.sequencer ? "lightgreen" : "white",
//     }}
//   >
//     {track.synthesizer
//       ? track.synthesizer.name
//       : "Drop Synthesizer Here"}
//     {provided.placeholder}
//   </TableCell>
// )}
// </Droppable>

{
  /* <React.Fragment key={index}>
  <ListItem>
    <ListItemButton
      {...(index === 0 && { variant: 'soft', color: 'primary' })}
      sx={{ p: 2 }}
    >
      <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
        <Avatar
          alt=""
          src={item.avatar}
          srcSet={item.avatar2x}
          sx={{ borderRadius: 'sm' }}
        />
      </ListItemDecorator>
      <Box sx={{ pl: 2, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 0.5,
          }}
        >
          <Typography level="body3">{item.name}</Typography>
          <Typography level="body3" textColor="text.tertiary">
            {item.date}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ mb: 0.5 }}>{item.title}</Typography>
          <Typography level="body2">{item.body}</Typography>
        </Box>
      </Box>
    </ListItemButton>
  </ListItem>
<ListDivider sx={{ m: 0 }} />
</React.Fragment> */
}
//
{
  /* <Box
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
align="left"
sx={{ pl: 2, width: "100%", height: "100%" }}
>
{track.arranger ? track.arranger.name : "Drop Arranger Here"}
{provided.placeholder}
</Box> */
}

// <ListItem sx={{ pl: 2, width: "20%", height: "100%" }}>
// <Droppable
//   index={track.id + 12}
//   droppableId={`track-${track.id}-sequencer`}
// >
//   {(provided, snapshot) => (
//     <Card
//       ref={provided.innerRef}
//       {...provided.draggableProps}
//       {...provided.dragHandleProps}
//       row
//       variant="outlined"
//       sx={{
//         minWidth: "260px",
//         gap: 2,
//         bgcolor: "background.body",
//       }}
//     >
//       <CardOverflow></CardOverflow>
//       <CardContent>
//         <Typography
//           fontWeight="md"
//           textColor="success.plainColor"
//           mb={0.5}
//         >
//           {track.sequencer
//             ? track.sequencer.name
//             : "Drop Sequencer Here"}
//           {provided.placeholder}
//         </Typography>
//       </CardContent>
//       <CardOverflow
//         variant="soft"
//         color="primary"
//         sx={{
//           px: 0.2,
//           writingMode: "vertical-rl",
//           textAlign: "center",
//           fontSize: "xs2",
//           fontWeight: "xl2",
//           letterSpacing: "1px",
//           textTransform: "uppercase",
//         }}
//       >
//         Sequence
//       </CardOverflow>
//     </Card>
//   )}
// </Droppable>
// </ListItem>
// <ListItem sx={{ pl: 2, width: "20%", height: "100%" }}>
// <Droppable
//   index={track.id + 13}
//   droppableId={`track-${track.id}-synthesizer`}
// >
//   {(provided, snapshot) => (
//     <Card
//       ref={provided.innerRef}
//       {...provided.draggableProps}
//       {...provided.dragHandleProps}
//       row
//       variant="outlined"
//       sx={{
//         minWidth: "260px",
//         gap: 2,
//         bgcolor: "background.body",
//       }}
//     >
//       <CardOverflow></CardOverflow>
//       <CardContent>
//         <Typography
//           fontWeight="md"
//           textColor="success.plainColor"
//           mb={0.5}
//         >
//           {track.synthesizer
//             ? track.synthesizer.name
//             : "Drop Synthesizer Here"}
//           {provided.placeholder}
//         </Typography>
//       </CardContent>
//       <CardOverflow
//         variant="soft"
//         color="primary"
//         sx={{
//           px: 0.2,
//           writingMode: "vertical-rl",
//           textAlign: "center",
//           fontSize: "xs2",
//           fontWeight: "xl2",
//           letterSpacing: "1px",
//           textTransform: "uppercase",
//         }}
//       >
//         Synth
//       </CardOverflow>
//     </Card>
//   )}
// </Droppable>
// </ListItem>
