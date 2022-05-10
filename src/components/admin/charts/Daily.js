import { Box, Paper } from "core/ui/_libs";

import { SectionHeader } from ".";

export default function Daily() {
  return (
    <Box component={Paper}>
      <SectionHeader text="Daily updates" />
    </Box>
  );
}
