import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = styled((props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
})``;

interface MachineDrawerProps {
  machines: Array<any>;
  index: number;
  value: any;
  slug: string;
}

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid,
  margin: `0 0 ${grid}px 0`,
  width: "100%",
  borderBottom: "1px solid grey",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "inherit",
  "&:hover": {
    background: "lightgrey !important",
    margin: `1px 0 ${grid}px 0`,
  },

  // styles we need to apply on draggables
  ...draggableStyle,
});

// sx={{ padding: 0 }}
export default function MachineDrawer(
  props: MachineDrawerProps
): React.ReactElement {
  return (
    <TabPanel
      value={props.value}
      index={props.index}
      sx={{ padding: 0, bgcolor: "background.paper" }}
    >
      <Droppable droppableId={`${props.slug}-drawer`}>
        {(provided, _snapshot) => (
          <List
            disablePadding
            ref={provided.innerRef}
            // {...provided.draggableProps}
            // {...provided.dragHandleProps}
          >
            <ListItem style={{ backgroundColor: "#333" }}>
              <ListItemText>
                <Typography>
                  Drag {props.machines[0].machineType} from list below to track
                  in main window.
                </Typography>
              </ListItemText>
            </ListItem>
            {props.machines.map((machine: any, i: number) => {
              return (
                <Draggable
                  key={i}
                  draggableId={machine.slug}
                  index={machine.id}
                >
                  {(draggableProvided, _draggableSnapshot) => (
                    <ListItem
                      id={`${machine.machineType.toLowerCase()}-${
                        machine.slug
                      }`}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={getItemStyle(
                        _draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style
                      )}
                    >
                      <ListItemButton>
                        <ListItemText key={machine.id} primary={machine.name} />
                      </ListItemButton>
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </TabPanel>
  );
}
