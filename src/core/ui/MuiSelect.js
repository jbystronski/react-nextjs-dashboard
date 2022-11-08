import React from "react";
import {
  Select as MuiSelect,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";

const Select = ({
  label,
  selected,
  handleChange,
  options,
  displayProp,
  valueProp,
  emptyValue,
  size,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <MuiSelect
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
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
