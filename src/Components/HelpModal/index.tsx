import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Help
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <b>Why don't my changes to keys/scales/chords change right away?</b><br />
          <br />
          <p>These changes are made to take effect musically, that means they won't change until the end of a section.  By default sections are of 64 steps in length, but this can be changed in the top bar.</p>
        </Typography>
      </Box>
    </Modal>
  );
};
