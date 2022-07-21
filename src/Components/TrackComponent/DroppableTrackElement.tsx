import { observer } from "mobx-react-lite";
import { Droppable } from "react-beautiful-dnd";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import LaunchIcon from "@mui/icons-material/Launch";

import { UniqueColors } from "../Decorations";
import { useUIStore } from "../../stores/UI/useUIStore";

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

interface PresetsProps {}

const Presets = observer(({}: PresetsProps) => {
  return <div></div>;
});

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
          <Paper>
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              sx={{
                minWidth: "90%",
                minHeight: "100%",
                borderRadius: 0,
                gap: 0,
                borderTop: 0,
                borderBottom: 0,
              }}
            >
              <CardContent sx={{ pl: 2 }}>
                <Box>
                  {machine &&
                  machine.name !== "" &&
                  machine.name !== undefined ? (
                    <Box>
                      <Box>
                        <Typography fontWeight="md" color="success" mb={0.5}>
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
                    <MachinePlaceholder
                      placeholder={placeholder}
                      title={title}
                    />
                  )}

                  {provided.placeholder}
                </Box>
                {machine && machine.name !== "" ? (
                  <UniqueColors
                    name={`${machine.machineType}${machine.name}`}
                  />
                ) : (
                  ""
                )}
                <Presets />
                <Chip label={title} />
              </CardContent>
            </Card>
          </Paper>
        )}
      </Droppable>
    );
  }
);

export default DroppableTrackElement;
