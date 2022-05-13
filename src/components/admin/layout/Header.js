import React from "react";

import { IconButton, IconMapper } from "core/ui";
import { menus } from "components";
import { Toolbar, Text, Box, Stack } from "core/ui/_libs";
import { useTheme } from "core/ui/_libs";
import { useWindowSize } from "core/hooks";

const Header = ({ handleMenuOpen }) => {
  const { ThemesMenu, SettingsMenu } = menus;
  // const windowSize = useWindowSize();

  const theme = useTheme();

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
          md: "transparent"
        }
      }}
    >
      {/* <Box
        sx={{
          position: "fixed",

          textAlign: "center",
          top: "0%",
          left: "50%",
          backgroundColor: "black",
          width: "100px",

          "&::before": {
            [theme.breakpoints.down("sm")]: {
              content: `"${windowSize.width} - xs"`
            },
            [theme.breakpoints.up("sm")]: {
              content: `"${windowSize.width} - sm"`
            },
            [theme.breakpoints.up("md")]: {
              content: `"${windowSize.width} - md"`
            },
            [theme.breakpoints.up("lg")]: {
              content: `"${windowSize.width} - lg"`
            },
            [theme.breakpoints.up("xl")]: {
              content: `"${windowSize.width} - xl"`
            }
          }
        }}
      /> */}
      <Stack
        direction="row"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text
          variant="h5"
          sx={{ fontWeigh: 600, color: "secondary.main" }}
        ></Text>
        <Box>
          <ThemesMenu />

          <SettingsMenu />
        </Box>
      </Stack>
    </Toolbar>
  );
};

export default Header;
