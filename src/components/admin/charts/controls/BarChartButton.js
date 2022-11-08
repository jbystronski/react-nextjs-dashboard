import IconMapper from "core/ui/icons/IconMapper";
import IconButton from "core/ui/IconButton";

export default function BarChartButton({ handleClick }) {
  return (
    <IconButton sx={{ color: "#fff" }} onClick={() => handleClick("bar")}>
      <IconMapper icon="bar_chart" color="#fff" />
    </IconButton>
  );
}
