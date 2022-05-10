import { IconButton, IconMapper } from "core/ui";

export const RefreshButton = ({ handleClick }) => (
  <IconButton
    icon={<IconMapper icon="chart_search" color="icons.primary" />}
    onClick={handleClick}
  />
);
