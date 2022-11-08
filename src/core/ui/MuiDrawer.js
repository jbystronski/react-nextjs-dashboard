import React from "react";
import { useTheme } from "@mui/styles";
import { Drawer, Toolbar, List, Divider } from "@mui/material";

export default function MuiDrawer({ width, ...props }) {
  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          backgroundColor: "drawer",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>{props.children}</List>
      <Divider />
    </Drawer>
  );
}
