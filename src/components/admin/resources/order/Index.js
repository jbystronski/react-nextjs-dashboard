import React, { useState } from "react";
import dynamic from "next/dynamic";

import { formatDate } from "core/utils/dateHelpers";
import ProductList from "./ProductList";

import IconMapper from "core/ui/icons/IconMapper";
import ColumnHeader from "core/ui/typography/ColumnHeader";
import GridSection from "core/ui/containers/GridSection";

const Invoice = dynamic(() => import("./Invoice"));

import { useFetch, useNotification } from "core/hooks";
import { useRouter } from "next/router";

import {
  Paper,
  Typography,
  Box,
  Stack,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

import Button from "core/ui/Button";

import IconButton from "core/ui/IconButton";

import MuiSelect from "core/ui/MuiSelect";

function Index({ id }) {
  const router = useRouter();
  const info = useNotification();

  const [invoiceShow, setInvoiceShow] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [shippingStatus, setShippingStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);

  const { data: order, error } = useFetch(`/api/db/find_one/orders?_id=${id}`, {
    init: null,
  });

  const { data: paymentMethods, error: paymentMethodsError } = useFetch(
    "/api/db/find/payment_methods",
    { init: null }
  );

  const { data: shippingMethods, error: shippingMethodsError } = useFetch(
    "/api/db/find/shipping_methods",
    { init: null }
  );

  const showInvoice = () => {
    setInvoiceShow(!invoiceShow);
  };

  const update = () => {
    info.set("Order updated", "success");
  };

  return (
    <>
      {order ? (
        <Grid container component={Paper} sx={{ p: 4 }}>
          <GridSection
            divider={false}
            sectionChildren={[
              <Stack
                key="order_btns"
                justifyContent="space-between"
                alignItems="center"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                spacing={{
                  xs: 2,
                  md: 0,
                }}
              >
                <Stack direction="column">
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Order #{order.order_number}
                  </Typography>
                  <Chip
                    label={formatDate(order.created_at, ".")}
                    color="info"
                  />
                </Stack>
                <Stack direction="row" alignItems="center">
                  {[
                    {
                      icon: "user",
                      tooltip: "Show owner",
                      onClick: () =>
                        router.push({
                          pathname: "/admin/resources/[model]/[id]",
                          query: { model: "users", id: order.user_id },
                        }),
                    },
                    {
                      icon: "order",
                      tooltip: "Invoice",
                      onClick: showInvoice,
                    },
                    {
                      icon: "table",
                      tooltip: "Orders list",
                      onClick: () =>
                        router.push({
                          pathname: "/admin/tables/[model]",
                          query: { model: "orders" },
                        }),
                    },
                  ].map((btn) => (
                    <IconButton
                      size="large"
                      key={btn.tooltip}
                      tooltip={btn.tooltip}
                      onClick={btn.onClick}
                    >
                      <IconMapper icon={btn.icon} color="primary.light" />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>,
            ]}
            sizing={[{ xs: 12 }]}
          />
          {invoiceShow ? (
            <GridSection
              sectionChildren={[
                <Invoice
                  key="invoice"
                  details={order}
                  showOrder={showInvoice}
                />,
              ]}
              sizing={[{ xs: 12 }]}
            />
          ) : null}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6} md={3}>
              <ColumnHeader>Billing details</ColumnHeader>

              {[
                {
                  v:
                    order.billing_details.first_name +
                    " " +
                    order.billing_details.last_name,
                },
                {
                  v: order.billing_details.company || null,
                },
                {
                  v: order.billing_details.street,
                },
                {
                  v:
                    order.billing_details.zip_code +
                    " ," +
                    order.billing_details.city,
                },
                {
                  v: order.billing_details.country,
                },
                {
                  v: order.billing_details.phone_number,
                },
              ].map((el, i) => (
                <Typography key={el.v + i} sx={{ ...el.styling }}>
                  {el.v}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6} md={3}>
              <ColumnHeader>Subtotal</ColumnHeader>

              {[
                {
                  v: Number(order.subtotal).toFixed(2),
                },
              ].map((el, i) => (
                <Typography key={el.v + i} sx={{ ...el.styling }}>
                  {el.v}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6} md={3}>
              <ColumnHeader>Total</ColumnHeader>

              {[
                {
                  v: Number(order.total).toFixed(2),
                },
              ].map((el, i) => (
                <Typography key={el.v + i} sx={{ ...el.styling }}>
                  {el.v}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6} md={3}>
              <ColumnHeader>Total to pay</ColumnHeader>
              {[
                {
                  v: Number(order.total_to_pay).toFixed(2),
                },
              ].map((el, i) => (
                <Typography key={el.v + i} sx={{ ...el.styling }}>
                  {el.v}
                </Typography>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
            <Divider />
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} md={5}>
              <ColumnHeader>Payment method</ColumnHeader>
              {paymentMethods && (
                <MuiSelect
                  inputWidth={{ xs: "100%", md: "70%" }}
                  size="small"
                  selected={order.payment_method}
                  parentValue={paymentMethod}
                  options={paymentMethods.map((el) => el.name)}
                  handleChange={setPaymentMethod}
                />
              )}
            </Grid>

            <Grid item xs={12} md={5}>
              <ColumnHeader>Payment status</ColumnHeader>
              <MuiSelect
                inputWidth={{ xs: "100%", md: "70%" }}
                size="small"
                selected={order.payment_status}
                parentValue={paymentStatus}
                options={["PD", "AWT", "PAR/P", "RFD", "CXL"]}
                handleChange={setPaymentStatus}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
            <Divider />
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={12} md={5}>
              <ColumnHeader>Shipping method</ColumnHeader>
              {shippingMethods && (
                <MuiSelect
                  size="small"
                  inputWidth={{ xs: "100%", md: "70%" }}
                  selected={order.shipping_method}
                  parentValue={shippingMethod}
                  options={shippingMethods.map((el) => el.name)}
                  handleChange={setShippingMethod}
                />
              )}
            </Grid>

            <Grid item xs={12} md={5}>
              <ColumnHeader>Shipping status</ColumnHeader>
              <MuiSelect
                inputWidth={{ xs: "100%", md: "70%" }}
                size="small"
                selected={order.shipping_status}
                parentValue={shippingStatus}
                options={["PREP", "DSPCH", "DELIV", "CXL"]}
                handleChange={setShippingStatus}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
            <Divider />
          </Grid>

          <GridSection
            divider={false}
            sizing={[{ xs: 12 }]}
            sectionChildren={[
              <Stack key="tracking_code" direction="column">
                <Stack direction="row" alignItems="center">
                  <ColumnHeader>Tracking code</ColumnHeader>
                  <IconButton
                    sx={{ color: "primary.light", ml: 1 }}
                    tooltip="Edit"
                  >
                    <IconMapper icon="edit" />
                  </IconButton>
                </Stack>
                <Typography>{order.package_tracking_code || "n/a"}</Typography>
              </Stack>,
            ]}
          />

          <GridSection
            divider={false}
            sizing={[{ xs: 12 }]}
            sectionChildren={[
              <Stack key="comment" direction="column">
                <ColumnHeader>Comment</ColumnHeader>
                <Box
                  sx={{ p: 3, borderRadius: "8px", bgcolor: "background.dark" }}
                >
                  {order.comment}
                </Box>
              </Stack>,
            ]}
          />

          <GridSection
            sizing={[{ xs: 12 }]}
            divider={false}
            sectionChildren={[
              <React.Fragment key="items">
                <ColumnHeader>Items</ColumnHeader>
                <ProductList
                  orderProducts={order.products}
                  productIds={order.products.map((el) => el.product_id)}
                />
              </React.Fragment>,
            ]}
          />
          <GridSection
            divider={false}
            sizing={[{ xs: 12 }]}
            sectionChildren={[
              <Stack
                key="bottom_btns"
                sx={{ mt: 3 }}
                direction="row"
                justifyContent={{
                  md: "flex-end",
                  xs: "center",
                }}
              >
                <Button
                  styling={{ minWidth: { xs: 230 } }}
                  label="Update changes"
                  onClick={() => update()}
                />
              </Stack>,
            ]}
          />
        </Grid>
      ) : (
        <Typography>No order found</Typography>
      )}
      {info.component}
    </>
  );
}

export default Index;
