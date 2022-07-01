import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/joy/TextField";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";

import { observer } from "mobx-react-lite";

// Icons import
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import MenuIcon from "@mui/icons-material/Menu";

// custom
import filesTheme from "../../theme.ts";
import Menu from "./Menu.tsx";
import Layout from "./Layout.tsx";
// import Navigation from './components/Navigation';

import { useStore } from "../../stores/useStore.tsx";

import MachineDrawer from "./MachineDrawer.tsx";

type Anchor = "top" | "left" | "bottom" | "right";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
};

interface SideBarProps {
  sequencerTypes: Array<string>;
  arrangerTypes: Array<string>;
  synthTypes: Array<string>;
  tempo: Number;
  setTempo: Function;
  play: boolean;
  playPause: Function;
  musicKey:
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "Ab"
    | "A#"
    | "Bb"
    | "Db"
    | "C#"
    | "Eb"
    | "D#"
    | "F#"
    | "Gb"
    | "G#";
  setKey: Function;
  musicScale: "Major" | "Minor";
  setScale: Function;
}

const TopBar = observer(() => {
  const store = useStore();
  const { play, playPause, tempo, setTempo } = store.musicFeaturesStore;

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function PlayButtonToggle({
    play,
    playPause,
  }: {
    play: boolean;
    playPause: Function;
  }) {
    return (
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="outlined"
        color="primary"
        onClick={playPause}
      >
        {play ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    );
  }

  function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

    const colorMode = React.useContext(ColorModeContext);

    React.useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) {
      return <IconButton size="sm" variant="outlined" color="primary" />;
    }
    return (
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="outlined"
        color="primary"
        onClick={() => {
          if (mode === "light") {
            colorMode.toggleColorMode();
            setMode("dark");
          } else {
            colorMode.toggleColorMode();
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    );
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  let anchor = "top";
  const checkboxLabel = { inputProps: { "aria-label": "Play Button" } };

  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <React.Fragment>
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <FindInPageRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Earthy MAW
            </Typography>
          </Box>
          <PlayButtonToggle play={play} playPause={playPause} />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <TextField
              size="sm"
              value={tempo}
              onChange={setTempo}
              endDecorator={
                <IconButton variant="outlined" size="sm" color="neutral">
                  <Typography
                    fontWeight="lg"
                    fontSize="sm"
                    textColor="text.tertiary"
                  >
                    bpm
                  </Typography>
                </IconButton>
              }
              sx={{
                flexBasis: "100px",
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
      </React.Fragment>
    </CssVarsProvider>
  );
});

{
  /* <OutlinedInput
                  id="outlined-adornment-weight"
                  value={tempo}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setTempo(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">bpm</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                /> */
}

// <AppBar position="sticky" color="primary" sx={{ top: 0, bottom: "auto" }}>
// <Toolbar>
//   <Box sx={{ flexGrow: 1 }}>
//     <FormGroup style={flexContainer}>
//     </FormGroup>
//   </Box>
//   <Box sx={{ flexGrow: 1 }} />
// </Toolbar>
// <div></div>
// </AppBar>
// <Drawer
// anchor={anchor}
// variant="persistent"
// open={state[anchor]}
// onClose={toggleDrawer(anchor, false)}
// >
// {list(anchor)}
// </Drawer>

// {/* <TextField
//   size="sm"
//   placeholder="Search anything…"
//   startDecorator={<SearchRoundedIcon color="primary" />}
//   endDecorator={
//     <IconButton variant="outlined" size="sm" color="neutral">
//       <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
//         /
//       </Typography>
//     </IconButton>
//   }
//   sx={{
//     flexBasis: '500px',
//     display: {
//       xs: 'none',
//       sm: 'flex',
//     },
//   }}
// /> */}
// const list = (anchor: Anchor) => (
//   <Box
//     sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
//     role="presentation"
//     onKeyDown={toggleDrawer(anchor, false)}
//   >
//     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         aria-label="basic tabs example"
//       >
//         <Tab label="Synthesizers" {...a11yProps(0)} />
//         <Tab label="Sequencers" {...a11yProps(1)} />
//         <Tab label="Arrangers" {...a11yProps(2)} />
//       </Tabs>
//       <IconButton
//         color="inherit"
//         aria-label="close drawer"
//         onClick={toggleDrawer("bottom", false)}
//       >
//         <MenuIcon />
//       </IconButton>
//     </Box>
//     <MachineDrawer
//       slug="synthesizers"
//       machines={props.synthTypes}
//       index={0}
//       value={value}
//     />
//     <MachineDrawer
//       slug="sequencers"
//       machines={props.sequencerTypes}
//       index={1}
//       value={value}
//     />
//     <MachineDrawer
//       slug="arrangers"
//       machines={props.arrangerTypes}
//       index={2}
//       value={value}
//     />
//   </Box>
// );

export default TopBar;
