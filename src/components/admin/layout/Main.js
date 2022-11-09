import { Box } from "@mui/material";
import ReactFileManager from "@jb_fmanager/react";

import { useTheme } from "@mui/styles";
import { useAdmin } from "lib/contexts";

const Main = (props) => {
  const { managerOpen, setManagerOpen } = useAdmin();

  const { palette } = useTheme();

  return (
    <Box component="main">
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {props.children}

        {managerOpen && (
          <ReactFileManager
            isOpen={managerOpen}
            onClose={() => setManagerOpen(false)}
            namespace="api/fm"
            id="jb_fmanager"
            mount="public"
            maxUploadSize="6291456"
            browserOnly={true}
            parentDarkMode={palette.mode === "dark"}
            stackIndex={6000}
            lightTheme={{}}
            darkTheme={{
              input: {
                background: "transparent",
                border: palette.primary.main,
              },

              surface1: palette.background.paper, // main background
              surface2: "rgba(0,0,0,0.2)", // file display
              surface3: "rgba(0,0,0,0.6)", // navigation tree
              surface4: palette.background.paper, // img wrapper
              surface5: palette.background.paper,
              surface6: palette.background.default, // menu
              surface7: palette.background.default, // tooltip

              divider: palette.divider,

              font1: palette.text.primary, // main font

              font2: "#fff", // secondary font
              font3: "#fff", // navigation font
              font4: "#fff", // contrast font

              syntax1: palette.warning.main, // folders on display
              syntax2: palette.warning.main, // folders in navigation
              syntax3: "#fff", // files on display
              syntax4: "#fff", // files in navigation
              syntaxFocus: palette.primary.main,

              primary: palette.primary.main,

              secondary: palette.secondary.main,

              highlight: palette.highlight,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Main;
