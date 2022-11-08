import React from "react";
import { Tooltip } from "@mui/material";

const withTooltip = (Component) => (props) => {
  return (
    <Tooltip title={props.tooltip}>
      <Component {...props} />
    </Tooltip>
  );
};

export default withTooltip;
