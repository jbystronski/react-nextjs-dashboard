import { Portal, Fade, Box } from "@mui/material";

import Button from "core/ui/Button";

export default function FullscreenImage({ path, props, handleClose }) {
  return (
    <>
      {!!path ? (
        <Portal>
          <Fade in={!!path}>
            <Box
              sx={{
                bgcolor: "#fff",
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 6002,
              }}
            >
              <Box sx={{ position: "fixed", right: "1%", bottom: "2%" }}>
                <Button label="close" onClick={handleClose} />
              </Box>
              <Box sx={{ overflow: "auto", width: "100%", height: "100%" }}>
                <img src={path} />
              </Box>
            </Box>
          </Fade>
        </Portal>
      ) : null}
    </>
  );
}
