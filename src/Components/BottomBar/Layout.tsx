import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

const Footer = (props: BoxProps) => (
  <Box
    component="footer"
    className="Footer"
    {...props}
    sx={[
      {
        p: 0,
        gap: 1,
        bgcolor: 'background.componentLayerBg',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1 / -1',
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'fixed',
        width: '100%',
        bottom: 0,
        zIndex: 1100,
        top: "auto"
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

export default {
  Footer,
};
