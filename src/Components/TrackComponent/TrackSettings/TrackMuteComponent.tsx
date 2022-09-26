import * as React from "react";
import { observer } from "mobx-react-lite";

import Typography from "@mui/material/Typography";

import FullGridButton from "../../TightBorderedGrid/FullGridButton";
import TrackVolume from "../../../stores/Track/TrackVolume";

interface MuteComponentProps {
  trackVolume: TrackVolume;
}

const MuteComponent = observer(
  ({ trackVolume }: MuteComponentProps): React.ReactElement => {
    const { muted, toggleMute } = trackVolume;

    return (
      <React.Fragment>
        <FullGridButton
          variant={muted ? "contained" : "outlined"}
          size="small"
          style={{ borderRadius: "0", minWidth: 0, marginLeft: 0 }}
          onClick={toggleMute}
        >
          <Typography>M</Typography>
        </FullGridButton>
      </React.Fragment>
    );
  }
);

export default MuteComponent;
