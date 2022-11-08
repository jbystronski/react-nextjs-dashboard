import { Box, Paper } from "@mui/material";

import { SectionHeader } from "./SectionHeader";

export default function Daily() {
  return (
    <Box component={Paper}>
      <SectionHeader text="Daily updates" />
    </Box>
  );
}
