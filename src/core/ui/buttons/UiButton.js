import { Button, Text } from "core/ui/_libs";

export default function UiButton({
  label,
  onClick,
  size = "medium",
  styling = {},
  ...props
}) {
  return (
    <Button
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
        ...styling
      }}
    >
      <Text variant="body1">{label}</Text>
    </Button>
  );
}
