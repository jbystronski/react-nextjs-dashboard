import { useState } from "react";

import ConfirmationDialog from "core/ui/ConfirmationDialog";

export default function useConfirm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [confirmCallback, setConfirmCallback] = useState(false);

  return {
    showDialog: ({ title, accept }) => {
      setOpen(true);
      setTitle(title);
      setConfirmCallback(() => accept);
    },

    component: (
      <ConfirmationDialog
        open={open}
        handleClose={() => setOpen(false)}
        title={title}
        accept={confirmCallback}
        decline={() => {
          setOpen(false);
        }}
      />
    ),
  };
}
