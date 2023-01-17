import React, { useState } from "react";

import IconMapper from "core/ui/icons/IconMapper";
import ColumnHeader from "core/ui/typography/ColumnHeader";
import GridSection from "core/ui/containers/GridSection";
import LinkIconButton from "core/ui/LinkIconButton";
import IconButton from "core/ui/IconButton";

import {
  Stack,
  Box,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  Chip,
} from "@mui/material";
import Button from "core/ui/Button";
import Avatar from "core/ui/Avatar";
import { useFetch, useChunk, useNotification } from "core/hooks";
import { formatDate } from "core/utils/dateHelpers";
import { useRouter } from "next/router";
const arrayRand = require("core/utils/arrayRand");
import { useTheme } from "@mui/styles";

function Index({ id }) {
  const {
    palette: { misc: colors },
  } = useTheme();

  const notification = useNotification();

  const router = useRouter();
  const { data: user, error } = useFetch(`/api/db/find_one/users?_id=${id}`, {
    init: null,
  });

  const {
    chunk: orders,
    next: nextOrders,
    prev: prevOrders,
  } = useChunk(
    `/api/db/find/orders?user_id=${id}&_sort.created_at=-1&_limit=5`
  );

  return (
    <>
      {user ? (
        <Grid container component={Paper} sx={{ p: 3 }}>
          <GridSection
            sectionChildren={[
              <Stack
                key="user_top"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Avatar
                  size={[128, 128]}
                  styling={{ borderRadius: 2, mr: { xs: 0, md: 2 } }}
                  path={user.img || undefined}
                  fallback={
                    <IconMapper
                      icon="user"
                      color="primary.light"
                      sx={{ color: "primary.light" }}
                    />
                  }
                />
                <Stack
                  direction={{ xs: "column" }}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  spacing={1}
                >
                  <Typography variant="h6">
                    {user ? user.email : "default email"}
                  </Typography>
                  <Chip
                    sx={{ minWidth: "50px" }}
                    color="primary"
                    label={id ? user._id : null}
                    size="small"
                  />
                  <Typography
                    variant="button"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {user.logged_in ? "online" : "offline"}
                  </Typography>
                </Stack>
              </Stack>,
            ]}
            sizing={{ xs: 12 }}
          />
          <Grid container spacing={{ xs: 2, md: 0 }}>
            <Grid item container xs={12}>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <ColumnHeader>Details</ColumnHeader>

                {[
                  {
                    v: user.first_name + " " + user.last_name,
                  },
                  {
                    v: user.email,
                    styling: {
                      fontStyle: "oblique",
                    },
                  },
                  {
                    v: user.phone_number,
                  },
                ].map((el) => (
                  <Typography key={el.v} sx={{ ...el.styling }}>
                    {el.v}
                  </Typography>
                ))}
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <ColumnHeader>Address</ColumnHeader>

                {[
                  {
                    v: user.company || null,
                  },
                  {
                    v: user.tax_id || null,
                  },
                  {
                    v: user.street,
                  },
                  {
                    v: user.city + " ," + user.zip_code,
                  },
                  {
                    v: user.country,
                  },
                ].map((el) => (
                  <Typography key={el.v} sx={{ ...el.styling }}>
                    {el.v}
                  </Typography>
                ))}
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <ColumnHeader>Joined</ColumnHeader>
                <Typography>
                  {formatDate(user.created_at, ".").slice(0, 10)}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "oblique" }}>
                  {formatDate(user.created_at, ".").slice(10)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <GridSection
            sizing={[{ xs: 12 }]}
            divider={false}
            sectionChildren={[
              <React.Fragment key="all_orders">
                <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                  <ColumnHeader>All orders</ColumnHeader>
                </Box>

                {orders.length ? (
                  <>
                    <List>
                      {orders.map((order) => (
                        <ListItem
                          key={order.order_number}
                          sx={{
                            bgcolor: "background.dark",
                            mb: 2,
                            borderRadius: 0,
                            borderLeftColor: arrayRand(colors),
                            borderLeftWidth: 5,
                            borderLeftStyle: "solid",
                          }}
                        >
                          <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ width: "100%" }}
                          >
                            <Box>
                              <Typography>#{order.order_number}</Typography>
                              <Typography variant="caption">{`Created on ${formatDate(
                                order.created_at
                              )}`}</Typography>
                            </Box>
                            <Chip
                              color={
                                {
                                  AWT: "warning",
                                  ["PAR/P"]: "info",
                                  PD: "success",
                                  RFD: "warning",
                                  CXL: "error",
                                }[order.payment_status]
                              }
                              label={
                                {
                                  AWT: "awaiting",
                                  ["PAR/P"]: "partial payment",
                                  PD: "paid",
                                  RFD: "refund",
                                  CXL: "cancelled",
                                }[order.payment_status]
                              }
                            />
                            <LinkIconButton
                              tooltip="View order"
                              size="small"
                              onClick={() =>
                                router.push({
                                  pathname: "/admin/resources/[model]/[id]",
                                  query: { model: "orders", id: order._id },
                                })
                              }
                            />
                          </Stack>
                        </ListItem>
                      ))}
                    </List>
                    <Box
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {[
                        {
                          icon: (
                            <IconMapper
                              icon="paginate_prev"
                              color="icons.primary"
                            />
                          ),
                          tooltip: "Previous orders",
                          onClick: prevOrders,
                        },
                        {
                          icon: (
                            <IconMapper
                              icon="paginate_next"
                              color="icons.primary"
                            />
                          ),
                          tooltip: "Next orders",
                          onClick: nextOrders,
                        },
                      ].map((props) => (
                        <IconButton
                          key={props.tooltip}
                          size="medium"
                          {...props}
                        />
                      ))}
                    </Box>
                  </>
                ) : (
                  <Typography>No orders yet...</Typography>
                )}
              </React.Fragment>,
            ]}
          />
          <Grid item xs={12}>
            <Stack flexDirection="row" justifyContent="center" sx={{ p: 3 }}>
              <Button
                onClick={() =>
                  notification.set("User account has been deleted", "info")
                }
                label="Delete account"
                styling={{ bgcolor: "primary.main", minWidth: 230 }}
              />
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Typography>No user found</Typography>
      )}

      {notification.component}
    </>
  );
}

export default Index;
