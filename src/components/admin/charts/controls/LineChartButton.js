import IconMapper from "core/ui/icons/IconMapper";
import IconButton from "core/ui/IconButton";

export default function LineChartButton({ handleClick }) {
  return (
    <IconButton
      sx={{ color: "text.primary" }}
      onClick={() => handleClick("line")}
    >
      <IconMapper icon="line_chart" fontSize="small" color="#fff" />
    </IconButton>
  );
}
