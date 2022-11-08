import { Typography } from "@mui/material";

export default function ColumnHeader({ children }) {
  return (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "600",
        mt: 1,
        mb: 1,

        color: "text.secondary",
      }}
    >
      {children}
    </Typography>
  );
}
