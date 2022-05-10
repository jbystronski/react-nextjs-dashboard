import React from "react";

import {
  InputLabel,
  FormControl,
  MenuItem,
  Select as UiSelect,
  Text
} from "core/ui/_libs";

import { IconMapper } from ".";

const Select = (props) => {
  const {
    label,
    init,
    options,
    displayProp,
    valueProp,
    emptyValue,
    name,
    size,
    inputProps
  } = props;

  const [value, setValue] = React.useState(init);

  const handleChange = (e) =>
    props?.handleChange
      ? props.handleChange(e.target.value)
      : setValue(e.target.value);

  const icon = <IconMapper icon="down" />;

  return (
    <FormControl sx={{ minWidth: 120, width: props.inputWidth }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <UiSelect
        label={<Text variant="caption">label</Text>}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props?.parentValue || value}
        onChange={handleChange}
        name={name}
        size={size}
        sx={{ fontSize: "1rem" }}
        inputProps={inputProps}
        SelectDisplayProps={{ fontSize: "1rem" }}
        // IconComponent={icon}
      >
        {emptyValue && (
          <MenuItem value={emptyValue}>
            <em>None</em>
          </MenuItem>
        )}
        {options &&
          options.map((o, index) => (
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              key={valueProp ? o[valueProp] + index : o + index}
              value={valueProp ? o[valueProp] : o}
            >
              {displayProp ? o[displayProp] : o}
            </MenuItem>
          ))}
      </UiSelect>
    </FormControl>
  );
};

export default Select;
