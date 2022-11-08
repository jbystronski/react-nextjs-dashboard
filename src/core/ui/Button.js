import { Button as B, Typography } from "@mui/material";

export default function Button({
  label,
  onClick,
  size = "medium",
  styling = {},
  ...props
}) {
  return (
    <B
      onClick={onClick}
      variant="contained"
      disableElevation={true}
      size={size}
      {...props}
      sx={{
        textTransform: "lowercase",
        minWidth: "100px",
        borderRadius: "16px",
        fontSize: "0.75rem",
        ...styling,
      }}
    >
      <Typography variant="body2">{label}</Typography>
    </B>
  );
}
