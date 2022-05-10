import React from "react";
import { useManager } from "../context";
import { styled } from "@mui/material/styles";

import { UiButton, IconMapper } from "core/ui";

const Input = styled("input")({
  display: "none"
});

export default function UploadInput() {
  const { onFileChange } = useManager();

  return (
    <label htmlFor="upload-btn">
      <Input onChange={onFileChange} id="upload-btn" multiple type="file" />
      <UiButton
        component="span"
        endIcon={<IconMapper icon="link" fontSize="small" color="#fff" />}
        label="Attach Files"
      />
    </label>
  );
}
