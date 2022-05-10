import { Loader } from "core/ui";

import { Box } from "core/ui/_libs";

export default function FullScreenLoader() {
  return (
    <Box
      sx={{
        w: 1,
        h: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
      >
        <Loader />
      </Box>
    </Box>
  );
}
