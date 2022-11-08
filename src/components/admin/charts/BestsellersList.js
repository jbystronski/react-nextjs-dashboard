import React from "react";
import { useChunk } from "core/hooks";
import BestsellersChart from "./BestsellersChart";

import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Box,
  Stack,
} from "@mui/material";

import Avatar from "core/ui/Avatar";

import { SectionHeader } from "./SectionHeader";

import IconMapper from "core/ui/icons/IconMapper";
import LinkIconButton from "core/ui/LinkIconButton";
import IconButton from "core/ui/IconButton";

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
              mt: 2,
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
                      borderRadius: "8px",
                    }}
                    secondaryAction={
                      <LinkIconButton
                        tooltip="Go to product"
                        size="small"
                        onClick={() =>
                          router.push({
                            pathname: "/admin/forms/edit/[model]/[id]",
                            query: { model: "products", id: product._id },
                          })
                        }
                      />
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
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
                      <Typography variant="body1">{product.name}</Typography>

                      <Typography variant="body2">{`${product.sold} units sold`}</Typography>
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
                icon: "paginate_prev",
                tooltip: "Previous users",
                onClick: prev,
              },
              {
                icon: "paginate_next",
                tooltip: "Next users",
                onClick: next,
              },
            ].map(({ icon, tooltip, ...props }) => (
              <IconButton key={tooltip} tooltip={tooltip} {...props}>
                <IconMapper icon={icon} color="icons.primary" />
              </IconButton>
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
}
