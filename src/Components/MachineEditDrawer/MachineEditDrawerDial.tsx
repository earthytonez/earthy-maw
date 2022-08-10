import * as React from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface MachineEditDrawerDialProps {
    edit: any; // (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    name: string;
    field: string;
    fieldOptions: any;
}

export default observer(
    ({
      edit,
      name,
      field,
      fieldOptions,
    }: MachineEditDrawerDialProps): React.ReactElement => {
      if (!fieldOptions) {
        return <Box sx={{ mt: 2 }}></Box>;
      }
    
      return (
        <Box sx={{ mt: 2 }} >
          <Typography>{name}</Typography>
          <Button onClick={edit} />
          <Box id={`dial-${field}`} />
        </Box>
      );
    }
  );
  