import React from "react";
import { useManager } from "../context";
import { IconButton, IconMapper } from "core/ui";

import FolderCreatePopper from "./FolderCreatePopper";

export default function Tools() {
  const { fetchFiles, setViewIndex } = useManager();

  const btns = [
    {
      icon: (
        <IconMapper icon="refresh" fontSize="small" color="icons.primary" />
      ),
      onClick: fetchFiles,
      tooltip: "Refresh files"
    },

    {
      icon: (
        <IconMapper
          icon="upload_folder"
          fontSize="small"
          color="icons.primary"
        />
      ),
      onClick: () => setViewIndex(1),
      tooltip: "Show upload queue"
    },
    {
      icon: (
        <IconMapper icon="file_list" fontSize="small" color="icons.primary" />
      ),
      onClick: () => setViewIndex(0),
      tooltip: "Show folder contents"
    },
    {
      icon: <IconMapper icon="shared" fontSize="small" color="icons.primary" />,
      onClick: () => setViewIndex(0),
      tooltip: "Shared files"
    }
  ];
  return (
    <>
      <FolderCreatePopper />
      {btns.map((props) => (
        <IconButton key={props.tooltip} {...props} />
      ))}
    </>
  );
}
