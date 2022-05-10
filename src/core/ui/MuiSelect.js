import React from "react";

import { Select, FormControl, MenuItem, InputLabel } from "core/ui/_libs";

const MuiSelect = ({
  label,
  selected,
  handleChange,
  options,
  displayProp,
  valueProp,
  emptyValue,
  size
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        size={size}
        label={label}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        onChange={handleChange}
      >
        {emptyValue && (
          <MenuItem value={emptyValue}>
            <em>None</em>
          </MenuItem>
        )}
        {options &&
          options.map((o) => (
            <MenuItem key={o[valueProp] || o} value={o[valueProp] || o}>
              {o[displayProp] || o}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
