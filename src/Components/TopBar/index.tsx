import * as React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import OutlinedInput from "@mui/material/OutlinedInput";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { observer } from "mobx-react-lite";

// Icons import
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import MenuIcon from "@mui/icons-material/Menu";


import { useStore } from "../../stores/useStore.tsx";

const TopBar = observer(() => {
  const store = useStore();
  const {
    play,
    playPause,
    tempo,
    setTempo,
    musicSectionLength,
    setSectionLength,
  } = store.musicFeaturesStore;

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
        onClick={playPause}
      >
        {play ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    );
  }

  function ColorSchemeToggle() {
    const [mode, setMode] = React.useState<PaletteMode>("light");
    const [mounted, setMounted] = React.useState(false);

    const colorMode = React.useMemo(
      () => ({
        // The dark mode switch would invoke this method
        toggleColorMode: () => {
          setMode((prevMode: PaletteMode) =>
            prevMode === "light" ? "dark" : "light"
          );
        },
      }),
      []
    );

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

  return (
    <React.Fragment>
      <AppBar>
      <Toolbar>

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
          <OutlinedInput
            size="sm"
            value={tempo}
            onChange={setTempo}
            endAdornment={
              <Typography
                fontWeight="lg"
                fontSize="sm"
                color="text.tertiary"
              >
                bpm
              </Typography>
            }
            sx={{
              flexBasis: "100px",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          />
          <OutlinedInput
            size="sm"
            value={musicSectionLength}
            onChange={setSectionLength}
            endAdornment={
              <Typography
                fontWeight="lg"
                fontSize="sm"
                color="text.tertiary"
              >
                Section Length
              </Typography>
            }
            sx={{
              flexBasis: "140px",
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
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
});

export default TopBar;
