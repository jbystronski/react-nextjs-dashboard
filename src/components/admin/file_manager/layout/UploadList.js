import React from "react";
import UploadInput from "./UploadInput";
import { useManager } from "../context";
import { IconButton, UiButton, IconMapper, UiAvatar } from "core/ui";
import { useTheme } from "core/ui/_libs";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Stack,
  Text
} from "core/ui/_libs";

import { useNotification } from "core/hooks";

const UploadList = () => {
  const {
    directory,
    filesToUpload: files,
    removeFromUploadQueue,
    emptyUploadQueue,
    uploadFiles,
    isImage,
    fetchFiles,
    setFullscreenImage
  } = useManager();

  const {
    palette: { mode }
  } = useTheme();

  const info = useNotification();

  const handleUpload = async () => {
    const res = await uploadFiles(directory);
    await fetchFiles();

    if (res.status === 200) {
      info.set("Files uploaded", "success");
    } else {
      info.set("Error occured, check if your files are not too big", "error");
    }
  };

  const list = (
    <Box
      sx={{
        height: { xs: "auto", md: "90%" },
        px: { xs: 2, md: 1 },
        pl: { md: 0 },

        overflowY: "auto"
      }}
    >
      {files.length ? (
        <>
          <List
            disablePadding
            sx={{
              bgcolor: "background.dark",
              p: 1,
              pb: 1,
              borderRadius: 2,
              minHeight: "100%"
            }}
          >
            {files.map((f) => (
              <ListItem
                disablePadding
                sx={{
                  backgroundColor: "background.paper",
                  mb: "6px",
                  border: mode === "light" ? "1px solid #e9ecef" : "none",
                  borderRadius: 2,
                  px: "16px",
                  py: "4px"
                }}
                key={f.name}
                secondaryAction={
                  <>
                    {isImage(f.name) ? (
                      <IconButton
                        sx={{ mr: 1 }}
                        onClick={() =>
                          setFullscreenImage(URL.createObjectURL(f))
                        }
                        icon={<IconMapper icon="search" fontSize="small" />}
                        edge="end"
                        aria-label="show fullscreen"
                      />
                    ) : null}

                    <IconButton
                      sx={{ mr: 0.5 }}
                      onClick={() => removeFromUploadQueue(f.name)}
                      icon={<IconMapper icon="cancel" fontSize="small" />}
                      edge="end"
                      aria-label="delete"
                    />
                  </>
                }
              >
                <ListItemAvatar>
                  {isImage(f.name) ? (
                    <UiAvatar
                      size={[32, 32]}
                      path={URL.createObjectURL(f)}
                      styling={{ borderRadius: 2 }}
                    />
                  ) : (
                    <UiAvatar
                      size={[32.32]}
                      styling={{
                        bgcolor: "background.image",
                        width: 32,
                        height: 32,
                        borderRadius: 2
                      }}
                      fallback={
                        <IconMapper
                          icon="file"
                          color="icons.secondary"
                          fontSize="small"
                        />
                      }
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={f.name}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{ variant: "body2" }}
                  secondary={parseFloat(f.size / 1024).toFixed(2) + " KB"}
                />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{
            w: 1,
            height: "100%",
            bgcolor: "background.dark",
            borderRadius: 2
          }}
        >
          <Text variant="h6">Upload queue is empty</Text>
        </Box>
      )}
    </Box>
  );

  const btns = (
    <Stack direction="row" sx={{ px: 3, mt: 3 }} justifyContent="space-between">
      <Stack direction="row" spacing={3}>
        <UploadInput />
        <UiButton
          label="Upload"
          disabled={!files.length}
          onClick={handleUpload}
          endIcon={<IconMapper icon="upload" fontSize="small" />}
        />
      </Stack>
      <UiButton
        onClick={emptyUploadQueue}
        label="Empty all"
        disabled={!files.length}
        endIcon={<IconMapper icon="trash" />}
      />
    </Stack>
  );

  return (
    <Box sx={{ height: "inherit" }}>
      {list}
      {btns}
      {info.component}
    </Box>
  );
};

export default UploadList;
