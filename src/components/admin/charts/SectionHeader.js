import dynamic from "next/dynamic";
import { Stack, Text, Box } from "core/ui/_libs";

export const SectionHeader = ({ text, bg, children }) => (
  <Stack
    sx={{
      bgcolor: "header",
      fontWeight: "bold",
      p: 2,

      // pl: 1,
      // pr: 2,
      height: "48px",
      color: "#fff"
    }}
    direction="row"
    justifyContent="space-between"
    alignItems="center"
  >
    <Stack
      direction="row"
      spacing={1}
      sx={{ display: "flex", alignItems: "center", height: "64px" }}
    >
      <Text variant="body">{text}</Text>
    </Stack>
    <Box> {children}</Box>
  </Stack>
);
