import * as React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import TextField from "@mui/joy/TextField";

import { useColorScheme } from "@mui/joy/styles";
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
import Layout from "./Layout.tsx";
// import Navigation from './components/Navigation';

import { useStore } from "../../stores/useStore.tsx";

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
      </React.Fragment>  );
});

export default TopBar;
