import React, { useEffect } from "react";
import { useChunk } from "core/hooks";
import BestsellersChart from "./BestsellersChart";

import {
  List,
  ListItem,
  ListItemText,
  Text,
  ListItemAvatar,
  Box,
  Divider,
  Stack
} from "core/ui/_libs";

import { formatDate } from "core/utils/dateHelpers";

import { SectionHeader } from ".";
import { IconButton, LinkIconButton, IconMapper, UiAvatar } from "core/ui";

import { useRouter } from "next/router";

const arrayRand = require("core/utils/arrayRand");

export default function BestsellersList() {
  const router = useRouter();

  const limit = 5;

  const { chunk, next, prev } = useChunk(
    `/api/db/find/products?_sort.sold=-1&_only=name,sold,primary_image,_id`,
    limit
  );

  return (
    <>
      {chunk ? (
        <Box>
          <SectionHeader text="Bestsellers" />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              mb: 2,
              mt: 2
            }}
          >
            <BestsellersChart data={chunk} limit={limit} />
          </Box>

          <List dense sx={{ px: 2 }}>
            {chunk.length &&
              chunk.map((product, k) => (
                <React.Fragment key={product._id}>
                  <ListItem
                    sx={{
                      mb: 2,
                      bgcolor: "background.dark",
                      py: 2,
                      borderRadius: "8px"
                    }}
                    secondaryAction={
                      <LinkIconButton
                        tooltip="Go to product"
                        size="small"
                        onClick={() =>
                          router.push({
                            pathname: "/admin/forms/edit/[model]/[id]",
                            query: { model: "products", id: product._id }
                          })
                        }
                      />
                    }
                  >
                    <ListItemAvatar>
                      <UiAvatar
                        size={[42, 42]}
                        path={
                          product.primary_image
                            ? product.primary_image
                            : undefined
                        }
                        styling={{ borderRadius: "8px" }}
                        fallback={
                          <IconMapper icon="image_file" color="icons.primary" />
                        }
                      />
                    </ListItemAvatar>
                    {/* <ListItemText> */}
                    <Stack direction="column">
                      <Text variant="body1">{product.name}</Text>

                      <Text variant="body2">{`${product.sold} units sold`}</Text>
                    </Stack>
                    {/* </ListItemText> */}
                  </ListItem>
                  {/* <Divider /> */}
                </React.Fragment>
              ))}
          </List>
          <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
            {[
              {
                icon: <IconMapper icon="paginate_prev" color="icons.primary" />,
                tooltip: "Previous users",
                onClick: prev
              },
              {
                icon: <IconMapper icon="paginate_next" color="icons.primary" />,
                tooltip: "Next users",
                onClick: next
              }
            ].map((props) => (
              <IconButton key={props.tooltip} {...props} />
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
}
