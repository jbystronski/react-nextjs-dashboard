import { useState } from "react";
import { useAdmin } from "lib/contexts";
import { useUrls } from "@jb_fmanager/react";
import IconMapper from "core/ui/icons/IconMapper";
import FullscreenImage from "core/ui/FullscreenImage";

import {
  Stack,
  Typography,
  Box,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import Button from "core/ui/Button";
import { useNotification } from "core/hooks";
import Avatar from "core/ui/Avatar";

const OverlayImage = ({ file, menu }) => {
  const [state, setState] = useState(false);

  return (
    <Box
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
      sx={{
        width: "146px",
        height: "146px",
        overflow: "hidden",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.dark",
          cursor: "pointer",
          opacity: "0.9",
          position: "absolute",

          left: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          display: state ? "block" : "none",
          zIndex: 2000,
        }}
      >
        <Stack
          direction="row"
          sx={{
            p: 1,
            position: "absolute",
            width: "100%",
            bottom: 0,
            left: 0,
            justifyContent: "flex-end",
          }}
        >
          {menu &&
            menu.map((props, index) => {
              return (
                <IconButton
                  key={props.tooltip}
                  onClick={props.onClick}
                  tooltip={props.tooltip}
                >
                  <IconMapper icon={props.icon} color={props.iconColor} />
                </IconButton>
              );
            })}
        </Stack>
      </Box>

      <Avatar
        styling={{ borderRadius: "8px" }}
        size={[146, 146]}
        path={file}
        fallback={
          <IconMapper icon="image_file" sx={{ color: "primary.light" }} />
        }
      />
    </Box>
  );
};

const Images = ({
  id,
  productImages,
  handleSubmit,
  handleSetPrimary,
  primary,
}) => {
  const [secondary, setSecondary] = useState(
    productImages?.secondary_images || []
  );

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const { setManagerOpen } = useAdmin();

  const urls = useUrls();
  const notification = useNotification();

  const onSubmit = () => {
    const dataObject = {
      primary_image: primary,
      secondary_images: secondary,
    };
    handleSubmit(dataObject);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        {secondary.length ? (
          secondary.map((file, index) => (
            <Grid key={file} item xs={1}>
              <OverlayImage
                key={file}
                file={file}
                menu={[
                  {
                    icon: "x",
                    iconColor: "secondary.main",
                    onClick: () => {
                      const cp = secondary.slice();
                      cp.splice(index, 1);
                      setSecondary(cp);
                    },
                    tooltip: "Remove image",
                  },

                  {
                    icon: "image_file",
                    iconColor: "secondary.main",

                    onClick: () => setFullscreenImage(file),

                    tooltip: "Fullscreen",
                  },
                  {
                    icon: "star_empty",
                    iconColor: file === primary ? "gold" : "secondary.main",

                    onClick: () =>
                      handleSetPrimary(file === primary ? null : file),
                    tooltip: "Set primary image",
                  },
                ]}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body2">
            There are no images attached to this product
          </Typography>
        )}
      </Grid>

      <Divider sx={{ mb: 2 }} />
      <Typography sx={{ mb: 2 }}>Shared images</Typography>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        {urls.length
          ? urls.map((url) => {
              return (
                <Grid key={url} item xs={1}>
                  <OverlayImage
                    key={url}
                    file={url}
                    menu={[
                      {
                        icon: "image_file",
                        iconColor: "secondary.main",
                        onClick: () => setFullscreenImage(url),

                        tooltip: "Fullscreen",
                      },
                      {
                        icon: "plus",
                        iconColor: "secondary.main",
                        onClick: () => {
                          if (secondary.indexOf(url) !== -1) {
                            notification.set("Image already exists", "info");
                            notification.show();
                            return false;
                          }

                          setSecondary([...secondary, url]);
                        },
                        tooltip: "Add image",
                      },
                    ]}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
      <Stack direction="row" justifyContent="space-between">
        <Button
          label="browse files"
          variant="outlined"
          onClick={setManagerOpen}
          styling={{ mr: 3 }}
        />
        <Button label="Update" onClick={onSubmit} />
      </Stack>

      {notification.component}
      <FullscreenImage
        path={fullscreenImage}
        handleClose={() => setFullscreenImage(null)}
      />
    </Box>
  );
};

export default Images;
