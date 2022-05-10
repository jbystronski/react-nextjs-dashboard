import React from "react";

import { TextField as UiTextField } from "core/ui/_libs";

const TextField = React.forwardRef((props, ref) => {
  const { init, type = "text" } = props;

  React.useEffect(() => {}, [init]);

  return <UiTextField defaultValue={init} type={type} inputRef={ref} />;
});

export default TextField;
