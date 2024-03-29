import * as React from "react";
import { useNotification } from "core/hooks";

import IconMapper from "core/ui/icons/IconMapper";

import {
  Box,
  Popper,
  Fade,
  List,
  ListItem,
  Typography,
  useTheme,
  Portal,
} from "@mui/material";
import IconButton from "core/ui/IconButton";

export default function SettingsMenu() {
  const {
    palette: { mode },
  } = useTheme();

  const info = useNotification();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const menu = [
    {
      icon: "logout",
      text: "Sign out",
      onClick: () => info.set("Signing out", "info"),
    },
  ];

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: {
            xs: "#fff",
            sm: "#fff",
            md: mode === "light" ? "icons.primary" : "#fff",
          },
        }}
      >
        <IconMapper icon="menu_vertical" />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                p: 1,
                borderRadius: "8px",
                bgcolor: "background.paper",
                minWidth: "200px",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "divider",
              }}
            >
              <List dense disablePadding>
                {menu.map((opt) => (
                  <ListItem
                    key={opt.text}
                    button
                    onClick={opt.onClick}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">{opt.text}</Typography>
                    <IconMapper icon={opt.icon} color="icons.primary" />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Fade>
        )}
      </Popper>
      <Portal>{info.component}</Portal>
    </>
  );
}
