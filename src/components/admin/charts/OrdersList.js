import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Box,
} from "@mui/material";

import Avatar from "core/ui/Avatar";

import IconButton from "core/ui/IconButton";

import { formatDate } from "core/utils/dateHelpers";
import { useTheme } from "@mui/styles";

import { useRouter } from "next/router";
import IconMapper from "core/ui/icons/IconMapper";
import { SectionHeader } from "./SectionHeader";
import { useChunk } from "core/hooks";
import React from "react";

const arrayRand = require("core/utils/arrayRand");

function OrdersList() {
  const router = useRouter();
  const limit = 5;

  const {
    palette: { misc: colors },
  } = useTheme();
  const { chunk, next, prev } = useChunk(
    `/api/db/find/orders?_only=total_to_pay,billing_details.first_name,billing_details.last_name,updated_at&_sort.updated_at=-1`,
    limit
  );

  return (
    <Box>
      <SectionHeader
        text="New orders"
        icon={<IconMapper icon="order" />}
        bg={colors[4]}
      />

      <List dense disablePadding>
        {chunk.length &&
          chunk.map((order) => (
            <React.Fragment key={order._id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    icon={<IconMapper icon="link" />}
                    tooltip="View order"
                    onClick={() =>
                      router.push({
                        pathname: "/admin/resources/orders/[id]",
                        query: { id: order._id },
                      })
                    }
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar size="small" sx={{ bgcolor: arrayRand(colors) }}>
                    {order.billing_details.first_name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={`Order value ${order.total_to_pay}`}
                  secondary={`Created by ${order.billing_details.first_name} ${
                    order.billing_details.last_name
                  } on ${formatDate(order.updated_at)}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <IconButton
          icon={<IconMapper icon="left" />}
          onClick={prev}
          tooltip="Previous order"
        />
        <IconButton
          icon={<IconMapper icon="right" />}
          onClick={next}
          tooltip="Next order"
        />
      </Box>
    </Box>
  );
}

export default OrdersList;
