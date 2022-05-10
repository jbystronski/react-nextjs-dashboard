import React, { useState } from "react";

import { useManager } from "../context";

import { Box, TextField, InputAdornment, Divider } from "core/ui/_libs";

import { IconMapper } from "core/ui";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const { setSearchFilter } = useManager();

  const handleReset = () => {
    setValue("");
    setSearchFilter(null);
  };

  const handleSearchFilter = () => {
    if (value) {
      setSearchFilter(value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: { xs: "90%", md: "auto" },
        my: {
          xs: 2,
          md: 0
        }
      }}
    >
      <TextField
        sx={{ width: "100%" }}
        value={value}
        label="Search..."
        variant="outlined"
        size="small"
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconMapper
                onClick={handleSearchFilter}
                icon="search"
                styling={{ cursor: "pointer", fontSize: "large" }}
              />

              <IconMapper
                onClick={handleReset}
                icon="x"
                styling={{ cursor: "pointer", fontSize: "large" }}
              />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
}
