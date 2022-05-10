import React from "react";
import { Tooltip } from "core/ui/_libs";

const withTooltip = (Component) => (props) => {
  return (
    <Tooltip title={props.tooltip}>
      <Component {...props} />
    </Tooltip>
  );
};

export default withTooltip;
