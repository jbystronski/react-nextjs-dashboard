import IconMapper from "core/ui/icons/IconMapper";
import IconButton from "core/ui/IconButton";

export const RefreshButton = ({ handleClick }) => (
  <IconButton onClick={handleClick}>
    <IconMapper icon="chart_search" color="icons.primary" />
  </IconButton>
);
