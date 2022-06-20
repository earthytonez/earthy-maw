import Box from "@mui/material/Box";

import { Droppable, Draggable } from "react-beautiful-dnd";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
interface MachineDrawerProps {
  machines: Array<any>;
  index: number;
  value: any;
  slug: string;
}

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
                      >
                        <Item id={machine.id}>{machine.name}</Item>
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
