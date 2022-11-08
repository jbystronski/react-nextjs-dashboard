import { useState } from "react";
import IconMapper from "core/ui/icons/IconMapper";
import { TextField, Divider } from "@mui/material";
import IconButton from "../IconButton";

const useSearch = () => {
  const [value, setValue] = useState("");

  const onValueChange = (e) => setValue(e.target.value);

  const onSearchClicked = (cb) => cb(value.trim());

  return {
    value,
    onValueChange,
    onSearchClicked,
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
            <IconButton onClick={() => onSearchClicked(handleSearch)}>
              <IconMapper icon="search" color="icons.primary" />
            </IconButton>
          </>
        ),
      }}
    />
  );
}
