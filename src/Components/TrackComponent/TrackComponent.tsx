import * as React from "react";
import Track from "../../Objects/Track.ts";
import TableCell from "@mui/material/TableCell";

import { Droppable } from "react-beautiful-dnd";

interface TrackComponentProps {
  track: Track;
}

export default function TrackComponent(props: TrackComponentProps) {
  const { track } = props;
  return (
    <React.Fragment>
        <Droppable
          index={props.track.id + 11}
          droppableId={`track-${props.track.id}-arranger`}
        >
          {(provided, snapshot) => (
            <TableCell
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              align="left"
              style={{
                backgroundColor: track.sequencer ? "lightcoral" : "white",
              }}
            >
              {track.arranger ? track.arranger.name : "Drop Arranger Here"}
              {provided.placeholder}
            </TableCell>
          )}
        </Droppable>
        <Droppable
          index={props.track.id + 12}
          droppableId={`track-${props.track.id}-sequencer`}
        >
          {(provided, snapshot) => (
            <TableCell
              align="left"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                backgroundColor: track.sequencer ? "lightblue" : "white",
              }}
            >
              {track.sequencer ? track.sequencer.name : "Drop Sequencer Here"}
              {provided.placeholder}
            </TableCell>
          )}
        </Droppable>
        <Droppable
          index={props.track.id + 13}
          droppableId={`track-${props.track.id}-synthesizer`}
        >
          {(provided, snapshot) => (
            <TableCell
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              align="left"
              style={{
                backgroundColor: track.sequencer ? "lightgreen" : "white",
              }}
            >
              {track.synthesizer
                ? track.synthesizer.name
                : "Drop Synthesizer Here"}
              {provided.placeholder}
            </TableCell>
          )}
        </Droppable>
    </React.Fragment>
  );
}
