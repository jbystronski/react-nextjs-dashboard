import { React, useState, useEffect } from "react";
import { Box, Stack, Divider, Text } from "core/ui/_libs";

import { Product, Images, Reviews } from ".";
import { IconButton, Image, IconMapper, UiAvatar } from "core/ui";

const Main = ({ data, handleSubmit, id, getError, isValid }) => {
  const [view, setView] = useState(0);
  const [primary, setPrimary] = useState(data?.primary_image || null);

  const actions = [
    {
      icon: <IconMapper icon="list" fontSize="small" />,
      onClick: () => setView(0),
      tooltip: "General details"
    },
    {
      icon: <IconMapper icon="star_empty" fontSize="small" />,
      onClick: () => setView(1),
      tooltip: "Reviews"
    },
    {
      icon: <IconMapper icon="image_file" fontSize="small" />,
      onClick: () => setView(2),
      tooltip: "Images"
    }
  ];

  const views = {
    0: (
      <Product
        data={data}
        id={id}
        handleSubmit={handleSubmit}
        getError={getError}
        isValid={isValid}
      />
    ),
    1: id && <Reviews id={id} />,
    2: (
      <Images
        key={id}
        productImages={{
          primary_image: data["primary_image"],
          secondary_images: data["secondary_images"]
        }}
        id={id}
        primary={primary}
        handleSetPrimary={(v) => {
          setPrimary(v);
        }}
        handleSubmit={handleSubmit}
      />
    )
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
          <UiAvatar
            styling={{ borderRadius: "8px" }}
            size={[64, 64]}
            path={primary ? primary : null}
            fallback={<IconMapper icon="image_file" color="primary.light" />}
          />
        </Box>
        <Text variant="header5">
          {
            {
              0: "Product information",
              1: "Product reviews",
              2: "Product images"
            }[view]
          }
        </Text>

        <Box>
          {actions.map((a, k) => (
            <IconButton
              sx={{ color: "icons.primary" }}
              size="medium"
              key={k}
              {...a}
            />
          ))}
        </Box>
      </Stack>

      {/* <Stack direction="row"></Stack> */}
      <Box sx={{ p: 2 }}>{views[view]}</Box>
    </Box>
  );
};

export default Main;
