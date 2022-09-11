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
          What is the Earthy Maw?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Earthy Maw is two things<br />
          <br />
          1: It's a generative music maker. Earthy Maw can be used to make (and eventually share) generative songs<br />
          <br />
          2: It's an experiment in predictable, customizable modulatable sequencers.  Sequencing generally fits into two categories. The first is step sequencers, which let you control every note that is played.  Length, pitch, volume, etc.  The second is random or algorithmic sequencers.  These tend to be less tangibly predictable and more likely to produce "happy accidents", though they can be easy to adjust for live performance.  I hope to create something in between.  Sequencers that although they are individually less flexible, are easier to understand what they do, and what will happen when you change them.<br />
        </Typography>
      </Box>
    </Modal>
  );
};
