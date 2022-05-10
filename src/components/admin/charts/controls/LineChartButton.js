import { IconButton, IconMapper } from "core/ui";

export default function LineChartButton({ handleClick }) {
  return (
    <IconButton
      sx={{ color: "text.primary" }}
      icon={<IconMapper icon="line_chart" fontSize="small" color="#fff" />}
      onClick={() => handleClick("line")}
    />
  );
}
