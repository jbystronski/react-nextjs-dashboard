import React from "react";

import { Checkbox as UiCheckbox, FormControlLabel } from "core/ui/_libs";

const Checkbox = (props) => {
  const { initial, label } = props;

  const [value, setValue] = React.useState(initial);

  const handleCheck = () => {
    setValue(!value);
  };

  return (
    <FormControlLabel
      componentsProps={{
        typography: {
          variant: "caption"
        }
      }}
      control={
        <UiCheckbox checked={!!value} onChange={handleCheck} {...props} />
      }
      label={label}
    />
  );
};

export default Checkbox;
