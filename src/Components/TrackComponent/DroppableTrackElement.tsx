import { observer } from "mobx-react-lite";
import { Droppable } from "react-beautiful-dnd";

import Button from "@mui/material/Button";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

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
              <Box>
                {machine &&
                machine.name !== "" &&
                machine.name !== undefined ? (
                  <Box>
                    <Box>
                      <Typography
                        fontWeight="md"
                        textColor="success.plainColor"
                        mb={0.5}
                      >
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
                  <MachinePlaceholder placeholder={placeholder} title={title} />
                )}

                {provided.placeholder}
              </Box>
              {machine && machine.name !== "" ? (
                <UniqueColors name={`${machine.machineType}${machine.name}`} />
              ) : (
                ""
              )}
              <Presets />
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
      </Droppable>
    );
  }
);

export default DroppableTrackElement;
