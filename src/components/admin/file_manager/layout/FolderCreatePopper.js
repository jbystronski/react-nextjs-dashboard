import { useState } from "react";
import { UiPopper, UiButton, IconMapper } from "core/ui";
import {
  TextField,
  Box,
  Text,
  InputAdornment,
  IconButton
} from "core/ui/_libs";
import { useManager } from "../context";

export default function FolderCreatePopper() {
  const { makeDirectory } = useManager();
  const [newFolder, setNewFolder] = useState("");
  const handleSetNewFolder = (e) => setNewFolder(e.target.value);

  return (
    <UiPopper
      placement="bottom-start"
      proceedAction={
        <UiButton
          label="Create"
          onClick={() => makeDirectory(directory, newFolder)}
        />
      }
      cancelAction={
        <UiButton
          label="Cancel"
          variant="outlined"
          onClick={() => makeDirectory(directory, newFolder)}
        />
      }
      icon={
        <IconMapper icon="add_folder" fontSize="small" color="icons.primary" />
      }
    >
      <Text sx={{ mb: 2 }} variant="caption">
        Create a new folder
      </Text>
      <TextField
        onChange={handleSetNewFolder}
        sx={{ pr: 1, mb: 2 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => makeDirectory(newFolder)}>
                <IconMapper icon="add_box" color="icons.primary" />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </UiPopper>
  );
}
