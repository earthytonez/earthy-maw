import * as React from "react";
import { observer } from "mobx-react-lite";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
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

const trackNameStyle = {
  position: "relative",
  "--AspectRatio-margin": "calc(-1 * var(--Card-padding)) 0px",
  marginTop: "var(--CardOverflow-offset)",
  marginBottom: "var(--CardOverflow-offset)",
  paddingTop: "",
  paddingBottom: "",
  "borderTop-right-radius": "",
  "borderBottom-right-radius": "",
  "--AspectRatioRadius":
    "0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth)) 0",
  borderTopLeftRadius: "0px",
  borderBottomLeftRadius: "0px",
  marginRight: "var(--CardOverflow-offset)",
  "--variant-borderWidth": "0px",
  color: "var(--joy-palette-primary-softColor)",
  paddingLeft: "1.6px",
  paddingRight: "1.6px",
  WebkitWritingMode: "vertical-rl",
  writingMode: "vertical-rl",
  textAlign: "center",
  fontSize: "var(--joy-fontSize-xs2)",
  fontWeight: "var(--joy-fontWeight-xl2)",
  letterSpacing: "1px",
  // backgroundColor: "var(--joy-palette-primary-softBg)",
  backgroundColor: "dark-grey",
  textTransform: "uppercase",
};

const TrackSettingsComponent = observer(
  ({ track }: ITrackSettingsComponentProps): React.ReactElement => {
    return (
      <Card sx={{ height: "100%", padding: "8px", paddingBottom: "0px" }}>
        <CardContent sx={{ pl: 2, padding: 0 }}>
          <Grid container spacing="0">
            <Grid item xs={.5} sx={trackNameStyle}>
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
            </Grid>
            <Grid item xs={11}>
            <Grid container  sx={{pt: 1}}>
            <Grid item xs={11}>
              <VolumeComponent trackVolume={track.trackFeatures.volume} />
            </Grid>
            <Grid item xs={1}>
              <Menu
                id="app-selector"
                control={
                  <IconButton size="small" aria-label="Apps">
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
            </Grid>
            </Grid>

            <Grid item xs={11}>
              <OctaveComponent
                octaves={track.octaves}
                toggleOctave={track.toggleOctave}
              ></OctaveComponent>
            </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
);

export default TrackSettingsComponent;
