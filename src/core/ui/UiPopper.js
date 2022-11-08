import { useState } from "react";
import { Fade, Popper, Stack } from "@mui/material";
import IconButton from "./IconButton";

export default function UiPopper({
  icon,
  proceedAction,
  cancelAction,
  placement,
  ...props
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  return (
    <>
      <IconButton sx={{ color: "secondary.main" }} onClick={handleClick}>
        {icon}
      </IconButton>
      <Popper
        placement={placement || "bottom-start"}
        style={{ zIndex: 6001 }}
        open={open}
        anchorEl={anchorEl}
        transition
        keepMounted
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Stack
              direction="column"
              sx={{
                p: 1,
                px: 2,
                pt: 2,
                borderRadius: "8px",
                bgcolor: "background.paper",
                minWidth: "200px",
                borderColor: "primary.main",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              {props.children}
            </Stack>
          </Fade>
        )}
      </Popper>
    </>
  );
}
