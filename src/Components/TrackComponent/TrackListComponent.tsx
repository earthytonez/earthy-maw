import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import Track from "./Objects/Track.ts";
import TrackComponent from "./TrackComponent.tsx";

import { Draggable, Droppable } from "react-beautiful-dnd";

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: "100%",
  height: "90vh",
});

interface TrackListComponentProps {
  tracks: Array<Track>;
}

export default function TrackListComponent(props: TrackListComponentProps) {
  const { tracks } = props;
  return (
    <Table sx={{ minWidth: '100%' }}>
      <TableBody>
        {tracks.map((track: Track, i: number) => (
          <TableRow
            key={i}
            style={{
              position: "relative",
              height: "6vh",
              width: "100%",
              display: "inline-block",
              float: "left",
              margin: "4px 0px",
            }}
          >
            <TrackComponent track={track}></TrackComponent>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
// <!-- // style={{position: "relative", height:"100%"}} -->

// <Droppable droppableId="track-list">
//   {(provided, snapshot) => (
//     <div
//       {...provided.droppableProps}
//       ref={provided.innerRef}
//       style={getListStyle(snapshot.isDraggingOver)}
//     >
// {tracks.map((track: Track, i: number) => (
// <Draggable index={track.id} key={i} draggableId={track.slug}>
//   {(provided, snapshot) => (
// <div
// ref={provided.innerRef}
// {...provided.draggableProps}
// {...provided.dragHandleProps}
//       style={{
//         boxShadow: '2px 2px 2px',
//         position: "relative",
//         height: "6vh",
//         width: "100%",
//         display: "inline-block",
//         float: "left",
//         borderBottom: "1px solid black",
//         margin: '4px 0px'
//       }}
//     >
//       <TrackComponent track={track}></TrackComponent>
//     </div>
// )}
// </Draggable>
// ))}
// {provided.placeholder}
// </div>
// )}
// </Droppable>
