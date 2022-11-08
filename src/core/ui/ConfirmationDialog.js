import React from "react";

import { Typography, DialogActions, DialogTitle, Dialog } from "@mui/material";
import Button from "core/ui/Button";

const ConfirmationDialog = ({ title, accept, decline, open, handleClose }) => {
  const onAccept = () => {
    accept();
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {<Typography variant="body1">{title}</Typography>}
      </DialogTitle>

      <DialogActions>
        <Button label="Ok" onClick={onAccept} />

        <Button variant="outlined" label="Cancel" onClick={decline} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
