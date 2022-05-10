import { useState, useEffect } from "react";

import { useManager } from "../context";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Text
} from "core/ui/_libs";

import { IconMapper } from "core/ui";

export default function BottomInput() {
  const { renameInput, setRenameInput, focusedFile, rename } = useManager();

  const [renameTo, setRenameTo] = useState(
    focusedFile ? focusedFile.value : ""
  );

  useEffect(() => {
    setRenameTo(focusedFile?.value);
  }, [focusedFile?.value]);

  return (
    <Box sx={{ p: 2, px: 3 }}>
      {renameInput && (
        <TextField
          sx={{ width: "100%" }}
          size="small"
          value={renameTo}
          onChange={(e) => setRenameTo(e.target.value)}
          InputProps={{
            startAdornment: (
              <Text sx={{ width: "100px" }} variant="caption">
                Rename file or folder:
              </Text>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    rename(focusedFile.key, focusedFile.value, renameTo)
                  }
                  size="small"
                >
                  <IconMapper
                    icon="ok"
                    fontSize="small"
                    color="icons.primary"
                  />
                </IconButton>
                <IconButton onClick={(e) => setRenameInput(false)} size="small">
                  <IconMapper icon="x" fontSize="small" color="icons.primary" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
    </Box>
  );
}
