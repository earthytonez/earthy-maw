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