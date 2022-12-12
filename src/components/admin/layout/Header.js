import React from "react";
import ThemesMenu from "../menus/ThemesMenu";
import SettingsMenu from "../menus/SettingsMenu";
import { Toolbar, Box, Stack } from "@mui/material";

const Header = (props) => {
  return (
    <Toolbar
      sx={{
        width: "100%",
        zIndex: 200,
        p: 0,
        m: 0,
        zIndex: 10,
        opacity: 0.9,
        backgroundColor: {
          xs: "primary.dark",
          md: "transparent",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Box>
          <ThemesMenu />

          {/* <SettingsMenu /> */}
        </Box>
      </Stack>
    </Toolbar>
  );
};

export default Header;
