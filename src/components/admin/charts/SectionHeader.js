import { Stack, Box, Typography } from "@mui/material";

export const SectionHeader = ({ text, children }) => (
  <Stack
    sx={{
      bgcolor: "header",
      fontWeight: "bold",
      p: 2,

      height: "48px",
      color: "#fff",
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
      <Typography variant="body">{text}</Typography>
    </Stack>
    <Box> {children}</Box>
  </Stack>
);
