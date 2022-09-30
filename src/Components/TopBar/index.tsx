import * as React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import HeaderNumberField from "./HeaderNumberField";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { observer } from "mobx-react-lite";

import { PaletteMode } from "@mui/material";

// Icons import
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import AboutModal from "./AboutModal";

import { useStore } from "../../stores/useStore";

const PlayButtonToggle = observer(
  ({ play, playPause }: { play: boolean; playPause: Function }) => {
    let onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      playPause();
    };

    return (
      <IconButton
        id="play-button"
        color="success"
        onClick={onClick}
        size="large"
      >
        {play ? (
          <PauseIcon fontSize="large" />
        ) : (
          <PlayArrowIcon fontSize="large" />
        )}
      </IconButton>
    );
  }
);

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
    return <IconButton size="small" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="small"
      // variant="outlined"
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
const TopBar = observer(() => {
  const [openAboutModal, setOpenAboutModal] = React.useState(false);
  const handleOpenAboutModal = () => setOpenAboutModal(true);
  const handleCloseAboutModal = () => setOpenAboutModal(false);

  const store = useStore();
  const {
    play,
    playPause,
    tempo,
    setTempo,
    musicSectionLength,
    setSectionLength,
  } = store.musicFeaturesStore;

  const onChangeTempo = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTempo(parseInt(ev.currentTarget.value));
  };

  const onChangeSectionLength = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSectionLength(parseInt(ev.currentTarget.value));
  };

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
            <Typography component="h1" fontWeight="xl">
              Earthy MAW
            </Typography>
            <PlayButtonToggle play={play} playPause={playPause} />
            <HeaderNumberField
              value={tempo.val}
              onChange={onChangeTempo}
              title="bpm"
              width="120px"
            />
            <HeaderNumberField
              value={musicSectionLength.val}
              onChange={onChangeSectionLength}
              title="Section Length"
              width="140px"
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <ColorSchemeToggle />
          </Box>
          <Box
            sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
          >
            <Button onClick={handleOpenAboutModal}>About</Button>
            <AboutModal
              open={openAboutModal}
              handleClose={handleCloseAboutModal}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
});

export default TopBar;
