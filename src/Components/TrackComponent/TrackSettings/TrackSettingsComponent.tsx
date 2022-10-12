import * as React from "react";
import { observer } from "mobx-react-lite";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import OctaveComponent from "./OctaveComponent";
import Track from "../../../stores/Track";

import Menu from "./TrackSettingsMenu";

import VolumeComponent from "./TrackVolumeComponent";
import MuteComponent from "./TrackMuteComponent";

import GridTopLeftCorner from "../../TightBorderedGrid/GridTopLeftCorner";
import GridTopMiddle from "../../TightBorderedGrid/GridTopMiddle";
import GridTopRightCorner from "../../TightBorderedGrid/GridTopRightCorner";
import TightBorderedPaper from "../../TightBorderedGrid/TightBorderedPaper";

interface ITrackSettingsComponentProps {
  track: Track;
}

const trackNameStyle = {
  position: "relative",
  "--AspectRatio-margin": "calc(-1 * var(--Card-padding)) 0px",
  marginTop: "var(--CardOverflow-offset)",
  marginBottom: "var(--CardOverflow-offset)",
  marginLeft: "13px",
  "borderTop-right-radius": "",
  "borderBottom-right-radius": "",
  "--AspectRatioRadius":
    "0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth)) 0",
  borderTopLeftRadius: "0px",
  borderBottomLeftRadius: "0px",
  marginRight: "var(--CardOverflow-offset)",
  "--variant-borderWidth": "0px",
  color: "var(--joy-palette-primary-softColor)",
  paddingLeft: "8px",
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
      <TightBorderedPaper
        sx={{ height: "100%", padding: 0, paddingBottom: "0px" }}
      >
        <Grid container spacing="0">
          <Grid item xs={0.5} sx={trackNameStyle}>
            <Typography
              color="neutral.500"
              fontWeight={700}
              sx={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: ".1rem",
              }}
            >
              Track {track.number + 1}
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Grid container sx={{ p: 0 }}>
              <GridTopLeftCorner item xs={8}>
                <VolumeComponent trackVolume={track.trackFeatures.volume} />
              </GridTopLeftCorner>
              <GridTopMiddle item xs={2} sx={{ p: 0 }}>
                <MuteComponent trackVolume={track.trackFeatures.volume} />
              </GridTopMiddle>
              <GridTopRightCorner item xs={2} sx={{ p: 0 }}>
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
              </GridTopRightCorner>
            </Grid>
            <Grid item xs={11}>
              <Grid container sx={{ p: 0 }}>
                <OctaveComponent
                  trackOctave={track.trackFeatures.octaves}
                ></OctaveComponent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TightBorderedPaper>
    );
  }
);

export default TrackSettingsComponent;
