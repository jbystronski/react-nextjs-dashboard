import React from "react";
import { IconButton as UiIconButton } from "core/ui/_libs";
import withTooltip from "../decorators/withTooltip";

const IconButton = (props) => {
  const Button = React.forwardRef(({ icon, ...props }, ref) => (
    <UiIconButton ref={ref} color="primary" {...props}>
      {icon}
    </UiIconButton>
  ));

  const Action = props.tooltip ? withTooltip(Button) : Button;

  return <Action {...props} />;
};

export default IconButton;
