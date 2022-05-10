import { useState } from "react";

import { IconButton, IconMapper } from "..";

import { TextField, Divider } from "core/ui/_libs";

const useSearch = () => {
  const [value, setValue] = useState("");

  const onValueChange = (e) => setValue(e.target.value);

  const onSearchClicked = (cb) => cb(value.trim());

  return {
    value,
    onValueChange,
    onSearchClicked
  };
};

export default function SearchBar({ placeholder, handleSearch }) {
  const { value, onValueChange, onSearchClicked } = useSearch();

  return (
    <TextField
      placeholder="Search..."
      size="small"
      value={value}
      onChange={onValueChange}
      InputProps={{
        endAdornment: (
          <>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              icon={<IconMapper icon="search" color="icons.primary" />}
              onClick={() => onSearchClicked(handleSearch)}
            />
          </>
        )
      }}
    />
  );
}
