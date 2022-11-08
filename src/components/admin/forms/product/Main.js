import { React, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Product from "./Product";
import Images from "./Images";
import Reviews from "./Reviews";
import IconMapper from "core/ui/icons/IconMapper";
import IconButton from "core/ui/IconButton";
import Avatar from "core/ui/Avatar";

const Main = ({ data, handleSubmit, id, getError, isValid }) => {
  const [view, setView] = useState("general");
  const [primary, setPrimary] = useState(data?.primary_image || null);

  const views = {
    general: (
      <Product
        data={data}
        id={id}
        handleSubmit={handleSubmit}
        getError={getError}
        isValid={isValid}
      />
    ),
    reviews: id && <Reviews id={id} />,
    images: (
      <Images
        key={id}
        productImages={{
          primary_image: data["primary_image"],
          secondary_images: data["secondary_images"],
        }}
        id={id}
        primary={primary}
        handleSetPrimary={(v) => {
          setPrimary(v);
        }}
        handleSubmit={handleSubmit}
      />
    ),
  };

  return (
    <Box sx={{ width: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: 1, p: 2, backgroundColor: "background.dark" }}
      >
        <Box sx={{ pl: 1, py: 1 }}>
          <Avatar
            styling={{ borderRadius: "8px" }}
            size={[64, 64]}
            path={primary ? primary : null}
            fallback={<IconMapper icon="image_file" color="primary.light" />}
          />
        </Box>
        <Typography variant="header5">
          {
            {
              0: "Product information",
              1: "Product reviews",
              2: "Product images",
            }[view]
          }
        </Typography>

        <Box>
          {[
            ["list", "General details", "general"],
            ["star_empty", "Reviews", "reviews"],
            ["image_file", "Images", "images"],
          ].map((a, index) => (
            <IconButton
              sx={{ color: "icons.primary" }}
              size="medium"
              key={index}
              onClick={() => setView(a[2])}
              tooltip={a[1]}
            >
              <IconMapper icon={a[0]} fontSize="small" />
            </IconButton>
          ))}
        </Box>
      </Stack>

      <Box sx={{ p: 2 }}>{views[view]}</Box>
    </Box>
  );
};

export default Main;
