import { Text } from "core/ui/_libs";

export default function ColumnHeader({ children }) {
  return (
    <Text
      variant="body1"
      sx={{
        fontWeight: "600",
        mt: 1,
        mb: 1,
        // textTransform: "uppercase",
        color: "text.secondary"
      }}
    >
      {children}
    </Text>
  );
}
