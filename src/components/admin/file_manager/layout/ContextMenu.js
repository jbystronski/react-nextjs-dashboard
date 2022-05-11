import React from "react";

import { IconMapper } from "core/ui";

import { Menu, MenuItem, ListItemIcon, ListItemText, Box } from "core/ui/_libs";

import { useManager } from "../context";

const ContextMenu = () => {
  const {
    contextMenu,
    download,
    focusedFile,
    handleOpenModal,
    handleShareFile,
    isImage,
    remove,
    setContextMenu,
    setFocusedFile,
    setFullscreenImage,
    setRenameInput,
    sharedFiles,
    serverPath
  } = useManager();

  const contextMenuActions = [
    {
      label:
        focusedFile &&
        serverPath &&
        serverPath(focusedFile["key"]) in sharedFiles
          ? "Unshare"
          : "Share",
      onClick: () => handleShareFile(focusedFile["key"]),
      icon:
        focusedFile &&
        serverPath &&
        sharedFiles.includes(serverPath(focusedFile["key"]))
          ? "checkbox_filled"
          : "checkbox_empty"
    },
    {
      label: "Download",
      onClick: () =>
        focusedFile !== null &&
        !focusedFile.hasChildren &&
        download(focusedFile["key"]),
      icon: "download"
    },
    {
      label: "Add folder",
      onClick: handleOpenModal,
      icon: "add_folder"
    },
    {
      label: "Rename",
      onClick: () => setRenameInput(true),
      icon: "edit"
    },
    {
      label: "Delete",
      onClick: remove,
      icon: "trash"
    }
  ];

  const getActions = (file, actions) => {
    if (isImage(file["key"])) {
      actions.push({
        label: "View",
        onClick: () => setFullscreenImage(file.key.split("public")[1]),
        icon: "image_file"
      });
    }

    return actions;
  };

  return (
    <>
      {focusedFile ? (
        <Menu
          component={Box}
          sx={{ zIndex: 6400 }}
          open={contextMenu !== null}
          onClose={() => setContextMenu(null)}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          {getActions(focusedFile, contextMenuActions).map((action) => (
            <MenuItem
              key={action.label}
              onClick={({ ...args }) => {
                action.onClick(args, setContextMenu(null));
              }}
            >
              <ListItemIcon>
                <IconMapper
                  icon={action.icon}
                  fontSize="small"
                  color="icons.primary"
                />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "caption" }}>
                {action.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </>
  );
};
export default ContextMenu;
