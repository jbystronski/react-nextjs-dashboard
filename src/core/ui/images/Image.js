import React from "react";
import { Box } from "core/ui/_libs";
import { IconMapper } from "core/ui";

const Image = ({ path, size, bg, ...props }) => {
  const calculateImageSize = (dimensions) => {
    if (typeof dimensions.width !== "object") return dimensions.width - 20;

    const maxWidths = { ...dimensions.width };

    for (const value in maxWidths) {
      maxWidths[value] -= 20;
    }
    return maxWidths;
  };

  const dimensions = {
    tiny: {
      width: {
        xs: 68
      },
      height: {
        xs: 68
      }
    },
    small: {
      width: {
        xs: 84
      },
      height: {
        xs: 84
      }
    },
    medium: {
      width: {
        xs: 94
      },
      height: {
        xs: 94
      }
    },
    default: {
      width: { xs: 170 },
      height: { xs: 170 }
    }
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        ...dimensions[size || "default"],
        borderRadius: 1,
        bgcolor: bg || "background.dark",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      {...props}
    >
      {props.children}
      <>
        {path ? (
          <Box
            component="img"
            sx={{
              height: "auto",
              maxWidth: calculateImageSize(dimensions[size || "default"])
            }}
            src={path}
          />
        ) : (
          <Box
            sx={{
              height: "auto",
              maxWidth: calculateImageSize(dimensions[size || "default"])
            }}
          >
            <IconMapper icon="image_file" />
          </Box>
        )}
      </>
    </Box>
  );
};

export default Image;
