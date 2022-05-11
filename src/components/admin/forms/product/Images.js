import { useState } from "react";
import { useAdmin } from "lib/contexts";
import { Stack, Text, Box, Fade, Divider, Grid } from "core/ui/_libs";
import {
  UiButton,
  IconMapper,
  UiAvatar,
  InteractiveImageMenu,
  FullscreenImage
} from "core/ui";
import { useNotification } from "core/hooks";

const OverlayImage = ({ file, menu }) => {
  const [state, setState] = useState(false);
  console.log("FILE", file);
  return (
    // <Fade timeout={300} in={show} sx={{ opacity: 0 }}>
    <Box
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
      sx={{
        width: "146px",
        height: "146px",
        overflow: "hidden",
        borderRadius: "8px",
        position: "relative"
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
          zIndex: 2000
        }}
      >
        <InteractiveImageMenu menu={menu} />
      </Box>

      <UiAvatar
        styling={{ borderRadius: "8px" }}
        size={[146, 146]}
        path={file ? file : null}
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
  primary
}) => {
  const [secondary, setSecondary] = useState(
    productImages?.secondary_images || []
  );
  // const [primary, setPrimary] = useState(productImages?.primary_image || null);

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const {
    sharedFiles,
    handleShareFile: removeFile,
    setManagerOpen
  } = useAdmin();
  const notification = useNotification();

  const onSubmit = () => {
    const dataObject = {
      primary_image: primary,
      secondary_images: secondary
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
                    icon: <IconMapper icon="x" color="secondary.main" />,
                    onClick: () => {
                      const cp = secondary.slice();
                      cp.splice(index, 1);
                      setSecondary(cp);
                    },
                    tooltip: "Remove image"
                  },
                  {
                    icon: (
                      <IconMapper icon="image_file" color="secondary.main" />
                    ),
                    onClick: () => setFullscreenImage(file),

                    tooltip: "Fullscreen"
                  },
                  {
                    icon: (
                      <IconMapper
                        icon="star_empty"
                        color={file === primary ? "gold" : "secondary.main"}
                      />
                    ),
                    onClick: () =>
                      handleSetPrimary(file === primary ? null : file),
                    tooltip: "Set primary image"
                  }
                ]}
              />
            </Grid>
          ))
        ) : (
          <Text variant="body2">
            There are no images attached to this product
          </Text>
        )}
      </Grid>

      <Divider sx={{ mb: 2 }} />
      <Text sx={{ mb: 2 }}>Shared images</Text>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        {sharedFiles.length
          ? sharedFiles.map((file) => {
              const f = file.split("public")[1];

              return (
                <Grid key={f} item xs={1}>
                  <OverlayImage
                    key={f}
                    file={f}
                    menu={[
                      {
                        icon: <IconMapper icon="x" color="secondary.main" />,
                        onClick: () => removeFile(file),
                        tooltip: "Remove image"
                      },
                      {
                        icon: (
                          <IconMapper
                            icon="image_file"
                            color="secondary.main"
                          />
                        ),
                        onClick: () => setFullscreenImage(f),

                        tooltip: "Fullscreen"
                      },
                      {
                        icon: <IconMapper icon="plus" color="secondary.main" />,
                        onClick: () => {
                          if (secondary.indexOf(f) !== -1) {
                            notification.set("Image already exists", "info");
                            notification.show();
                            return false;
                          }

                          setSecondary([...secondary, f]);
                        },
                        tooltip: "Add image"
                      }
                    ]}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
      <Stack direction="row" justifyContent="space-between">
        <UiButton
          label="browse files"
          variant="outlined"
          onClick={setManagerOpen}
          styling={{ mr: 3 }}
        />
        <UiButton label="Update" onClick={onSubmit} />
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
