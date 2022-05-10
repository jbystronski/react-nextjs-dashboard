import { IconMapper } from "core/ui";
import * as React from "react";

import {
  IconButton as UiIconButton,
  Box,
  Popper,
  Fade,
  List,
  ListItem,
  Text,
  useTheme
} from "core/ui/_libs";

export default function SettingsMenu() {
  const {
    palette: { mode }
  } = useTheme();

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
      onClick: () => alert("signing out")
    }
  ];

  return (
    <>
      <UiIconButton
        onClick={handleClick}
        sx={{
          color: {
            xs: "#fff",
            sm: "#fff",
            md: mode === "light" ? "icons.primary" : "#fff"
          }
        }}
      >
        <IconMapper icon="menu_vertical" />
      </UiIconButton>
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
                borderColor: "divider"
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
                    <Text variant="body2">{opt.text}</Text>
                    <IconMapper icon={opt.icon} color="icons.primary" />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
