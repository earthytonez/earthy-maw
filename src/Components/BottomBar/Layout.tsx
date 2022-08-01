import * as React from 'react';

import Box, { BoxProps } from '@mui/material/Box';

const Footer = (props: BoxProps): React.ReactElement => (
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
        zIndex: 0,
        top: "auto"
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const Layout = { Footer };

export default Layout
