import { IconButton, IconMapper } from "core/ui";

export default function BarChartButton({ handleClick }) {
  return (
    <IconButton
      sx={{ color: "#fff" }}
      icon={<IconMapper icon="bar_chart" color="#fff" />}
      onClick={() => handleClick("bar")}
    />
  );
}
