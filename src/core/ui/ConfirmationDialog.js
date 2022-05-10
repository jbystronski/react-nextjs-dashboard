import React from "react";

import { DialogTitle, Dialog, DialogActions, Text } from "core/ui/_libs";
import { UiButton } from "core/ui";

const ConfirmationDialog = ({ title, accept, decline, open, handleClose }) => {
  const onAccept = () => {
    accept();
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{<Text variant="body1">{title}</Text>}</DialogTitle>

      <DialogActions>
        <UiButton label="Ok" onClick={onAccept} />

        <UiButton variant="outlined" label="Cancel" onClick={decline} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
