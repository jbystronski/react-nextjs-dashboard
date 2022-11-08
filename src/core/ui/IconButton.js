import React from "react";
import { default as UiIconButton } from "@mui/material/IconButton";

const IconButton = ({ children, ...props }) => {
  return (
    <UiIconButton color="primary" {...props}>
      {children}
    </UiIconButton>
  );
};

export default IconButton;
