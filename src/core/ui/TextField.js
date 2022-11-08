import React from "react";
import { TextField as UiTextField } from "@mui/material";

const TextField = React.forwardRef((props, ref) => {
  const { init, type = "text" } = props;

  React.useEffect(() => {}, [init]);

  return <UiTextField defaultValue={init} type={type} inputRef={ref} />;
});

export default TextField;
