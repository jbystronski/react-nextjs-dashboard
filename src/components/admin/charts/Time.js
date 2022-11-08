import { getToday, getMonth } from "core/utils/dateHelpers";

import Timer from "core/ui/Timer";
import { Text, Box, Paper } from "@mui/material";

export default function Time() {
  return (
    <Box
      component={Paper}
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Text
        sx={{
          fontWeight: 600,
          color: "secondary.main",
          lineHeight: 1,
          mb: 1,
          fontStyle: "oblique",
        }}
        variant="h4"
      >
        {getToday().split("-")[0]}
      </Text>

      <Text
        sx={{
          fontWeight: 600,
          color: "secondary.main",
          lineHeight: 1,
          mb: 3,
          fontStyle: "oblique",
        }}
        variant="h6"
      >
        {getMonth(getToday()) + " " + getToday().split("-")[2]}
      </Text>

      <Text
        sx={{ color: "secondary.main", fontWeight: 600, fontStyle: "oblique" }}
      >
        <Timer />
      </Text>
    </Box>
  );
}
