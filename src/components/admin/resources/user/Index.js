import React, { useState } from "react";
import {
  IconMapper,
  UiButton,
  LinkIconButton,
  IconButton,
  ColumnHeader,
  GridSection,
  UiAvatar
} from "core/ui";
import {
  Stack,
  Box,
  Paper,
  Grid,
  Text,
  Avatar,
  Divider,
  List,
  ListItem,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "core/ui/_libs";
import { useFetch, useChunk } from "core/hooks";
import { formatDate } from "core/utils/dateHelpers";
import { useRouter } from "next/router";
const arrayRand = require("core/utils/arrayRand");
import { useTheme } from "@mui/styles";

import { useNotification } from "core/hooks";

function Index({ id }) {
  const {
    palette: { misc: colors }
  } = useTheme();

  const notification = useNotification();

  const [accountAction, setAccountAction] = useState("");
  const router = useRouter();
  const { data: user, error } = useFetch(`/api/db/find_one/users?_id=${id}`, {
    init: null
  });

  const handleAccountActionChange = (event) => {
    setAccountAction(event.target.value);
  };

  const {
    chunk: orders,
    next: nextOrders,
    prev: prevOrders
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
                // justifyContent={{
                //   xs: "center",
                //   sm: "center",
                //   md: "flex-start"
                // }}
                alignItems="center"
              >
                <UiAvatar
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
                  // justifyContent="center"
                  alignItems={{ xs: "center", md: "flex-start" }}
                  spacing={{ xs: 1, md: 1 }}
                >
                  <Text variant="h6">
                    {user ? user.email : "default email"}
                  </Text>
                  <Chip
                    sx={{ minWidth: "50px" }}
                    color="primary"
                    label={id ? user._id : null}
                    size="small"
                  />
                  <Text
                    variant="button"
                    sx={{
                      fontWeight: "600"
                    }}
                  >
                    {user.logged_in ? "online" : "offline"}
                  </Text>
                </Stack>
              </Stack>
            ]}
            sizing={[{ xs: 12 }]}
          />
          <Grid item container xs={12} spacing={{ xs: 2, md: 0 }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                flexDirection: "column",
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: { xs: "center", md: "flex-start" }
              }}
            >
              <ColumnHeader>Details</ColumnHeader>

              {[
                {
                  v: user.first_name + " " + user.last_name
                },
                {
                  v: user.email,
                  styling: {
                    fontStyle: "oblique"
                  }
                },
                {
                  v: user.phone_number
                }
              ].map((el) => (
                <Text key={el.v} sx={{ ...el.styling }}>
                  {el.v}
                </Text>
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
                alignItems: { xs: "center", md: "flex-start" }
              }}
            >
              <ColumnHeader>Address</ColumnHeader>

              {[
                {
                  v: user.company || null
                },
                {
                  v: user.tax_id || null
                },
                {
                  v: user.street
                },
                {
                  v: user.city + " ," + user.zip_code
                },
                {
                  v: user.country
                }
              ].map((el) => (
                <Text key={el.v} sx={{ ...el.styling }}>
                  {el.v}
                </Text>
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
                alignItems: { xs: "center", md: "flex-start" }
              }}
            >
              <ColumnHeader>Joined</ColumnHeader>
              <Text>{formatDate(user.created_at, ".").slice(0, 10)}</Text>
              <Text variant="body2" sx={{ fontStyle: "oblique" }}>
                {formatDate(user.created_at, ".").slice(10)}
              </Text>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Divider />
          </Grid>
          <Grid
            item
            container
            xs={12}
            direction="column"
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <Box sx={{ mb: 2, mt: 2 }}>
              <ColumnHeader>Account management</ColumnHeader>
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2 }}>
              <FormControl fullWidth sx={{ mr: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Select action
                </InputLabel>
                <Select
                  sx={{ minWidth: 230 }}
                  size="small"
                  value={accountAction}
                  onChange={handleAccountActionChange}
                  inputProps={{ fontSize: "1rem" }}
                >
                  {[
                    {
                      v: "resendToken",
                      label: "Resend activation token"
                    },
                    {
                      v: "blockUser",
                      label: "Block user"
                    }
                  ].map((el) => (
                    <MenuItem key={el.v} value={el.v}>
                      {el.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <UiButton
                label="Submit"
                onClick={
                  {
                    resendToken: () =>
                      notification.set(
                        "Token has been sent, please check your email",
                        "success"
                      ),
                    blockUser: () =>
                      notification.set("User has been blocked", "success")
                  }[accountAction]
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
            <Divider />
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
                            borderLeftStyle: "solid"
                          }}
                        >
                          <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ width: "100%" }}
                          >
                            <Box>
                              <Text>#{order.order_number}</Text>
                              <Text variant="caption">{`Created on ${formatDate(
                                order.created_at
                              )}`}</Text>
                            </Box>
                            <Chip
                              color={
                                {
                                  AWT: "warning",
                                  ["PAR/P"]: "info",
                                  PD: "success",
                                  RFD: "warning",
                                  CXL: "error"
                                }[order.payment_status]
                              }
                              label={
                                {
                                  AWT: "awaiting",
                                  ["PAR/P"]: "partial payment",
                                  PD: "paid",
                                  RFD: "refund",
                                  CXL: "cancelled"
                                }[order.payment_status]
                              }
                            />
                            <LinkIconButton
                              tooltip="View order"
                              size="small"
                              onClick={() =>
                                router.push({
                                  pathname: "/admin/resources/[model]/[id]",
                                  query: { model: "orders", id: order._id }
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
                        justifyContent: "space-between"
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
                          onClick: prevOrders
                        },
                        {
                          icon: (
                            <IconMapper
                              icon="paginate_next"
                              color="icons.primary"
                            />
                          ),
                          tooltip: "Next orders",
                          onClick: nextOrders
                        }
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
                  <Text>No orders yet...</Text>
                )}
              </React.Fragment>
            ]}
          />
          <Grid item xs={12}>
            <Stack flexDirection="row" justifyContent="center" sx={{ p: 3 }}>
              <UiButton
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
        <Text>No user found</Text>
      )}

      {notification.component}
    </>
  );
}

export default Index;
