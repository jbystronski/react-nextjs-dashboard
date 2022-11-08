import { useState, forwardRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

import IconMapper from "core/ui/icons/IconMapper";

const Alert = forwardRef(function Alert(props, ref) {
  const setIcon = (type) => <IconMapper icon={type} color="#fff" />;

  return (
    <MuiAlert
      ref={ref}
      variant="filled"
      iconMapping={{
        success: setIcon("ok"),
        error: setIcon("info"),
        info: setIcon("info"),
        warning: setIcon("info"),
      }}
      {...props}
      sx={{
        borderRadius: "8px",
        color: "#fff",
        minWidth: "250px",
        boxShadow: "none",
      }}
    />
  );
});

const useNotification = (alertDuration = 6000) => {
  const status = ["error", "success", "info", "warning"];
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [severity, setSeverity] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMsg(null);
    setSeverity(null);
    setOpen(false);
  };

  const setAlert = (msg, severity) => {
    if (!status.includes(severity)) {
      throw new Error("Unknown severity degree provided to Snackbar Component");
    }

    setMsg(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const notification = {
    show: () => setOpen(true),
    close: () => setOpen(false),
    set: (msg, severity) => setAlert(msg, severity),
    component: msg && severity && open && (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={alertDuration}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    ),
  };

  return notification;
};

export default useNotification;
