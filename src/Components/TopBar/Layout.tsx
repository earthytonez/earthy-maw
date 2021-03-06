import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

const Root = (props: BoxProps): React.ReactElement => (
  <Box
    {...props}
    sx={[
      {
        bgcolor: 'background.appBody',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
          md: 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)',
        },
        gridTemplateRows: '64px 1fr',
        minHeight: '100vh',
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const Header = (props: BoxProps) => (
  <Box
    component="header"
    className="Header"
    {...props}
    sx={[
      {
        p: 2,
        gap: 2,
        bgcolor: 'background.componentBg',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1 / -1',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 0,
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const SideNav = (props: BoxProps) => (
  <Box
    component="nav"
    className="Navigation"
    {...props}
    sx={[
      {
        p: 2,
        bgcolor: 'background.componentBg',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: {
          xs: 'none',
          sm: 'initial',
        },
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const SidePane = (props: BoxProps) => (
  <Box
    className="Inbox"
    {...props}
    sx={[
      {
        bgcolor: 'background.componentBg',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: {
          xs: 'none',
          md: 'initial',
        },
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);


export default {
  Root,
  Header,
  SideNav,
  SidePane,
};
