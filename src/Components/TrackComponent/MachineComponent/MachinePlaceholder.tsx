import React from "react";

import { observer } from "mobx-react-lite";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import { useUIStore } from "../../../stores/UI/useUIStore";

interface IMachinePlaceholderProps {
    machineType:     
        | "sequencer"
        | "modulator"
        | "synthesizer"
        | "arranger"
        | "musicFeature"
        | undefined,
    placeholder: string
}

export default observer(
    ({ machineType, placeholder }: IMachinePlaceholderProps): React.ReactElement => {
      const uiStore = useUIStore();
  
      return (
        <Box>
          <Box>{placeholder}</Box>
          <Box>
            <Button id="browse-machines" variant="outlined" onClick={(_ev: any) => uiStore.browseMachines(machineType)}>
              Browse {machineType}s
            </Button>
          </Box>
        </Box>
      );
    }
  );
  