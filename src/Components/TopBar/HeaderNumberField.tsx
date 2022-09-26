import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import React from "react";

import { observer } from "mobx-react-lite";

interface IHeaderNumberFieldParams {
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  title: string;
  width: string;
}

function IHeaderNumberFieldTitle({ children }: { children: string }) {
  return (
      <Typography
        align="center"
        color="neutral.500"
        fontWeight={700}
        sx={{
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: ".1rem",
          marginTop: 0
        }}
      >
        {children}{" "}
      </Typography>
  );
}

export default observer(
  ({
    value,
    onChange,
    title,
    width
  }: IHeaderNumberFieldParams): React.ReactElement => {
    return (
      <Stack>
        <TextField
          size="small"
          fullWidth
          variant="standard"
          value={value}
          onChange={onChange}
          type="number"
          inputProps={{
            min: 0, style: { 
              fontSize: '20px',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              textAlign: 'center',
            borderBottom: 0 }}} // the change is here
          sx={{
            width: width,
            border: 0,
            textAlign: "center",
            alignItems: 'center',
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
        <IHeaderNumberFieldTitle>{title}</IHeaderNumberFieldTitle>
      </Stack>
    );
  }
);
