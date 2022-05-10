import React from "react";

import { TextField } from "core/ui/_libs";

const TextInput = ({ init, type = "text", ...props }) => {
  const [val, setVal] = React.useState(init);

  return (
    <TextField
      value={val}
      type={type}
      onChange={(e) => setVal(e.target.value)}
      {...props}
    />
  );
};

export default TextInput;
