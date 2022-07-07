import React from "react";
import Box from "@mui/material/Box";

import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MachineCard = ({ id, name }: { id: string; name: string }) => {
  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

interface MachineDrawerProps {
  machines: Array<any>;
  index: number;
  value: any;
  slug: string;
}

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  width: "100%",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default function MachineDrawer(props: MachineDrawerProps): JSX {
  return (
    <TabPanel value={props.value} index={props.index}>
      <Droppable droppableId={`${props.slug}-drawer`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Stack direction="row" spacing={2}>
              {props.machines.map((machine: any, i: number) => {
                return (
                  <Draggable
                    key={i}
                    draggableId={machine.slug}
                    index={machine.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Box sx={{ minWidth: 275 }}>
                          <Card variant="outlined">
                            <MachineCard id={machine.id} name={machine.name} />
                          </Card>
                        </Box>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </Stack>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </TabPanel>
  );
}
