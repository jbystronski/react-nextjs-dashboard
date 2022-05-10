import { formatDate } from "core/utils/dateHelpers";

import { Text, Chip } from "core/ui/_libs";

const mapStatusColor = (status) => {};

const mapStatusLabel = (search, valuesFrom, valuesTo) => {
  const index = va;
};

module.exports = {
  title: "Orders",
  subRoute: "resources",

  defaultSearch: "order_number",
  searchable: [
    {
      key: "order_number",
      value: "Order no"
    }
  ],
  defaultSort: { created_at: -1 },
  sortable: [
    {
      key: "order_number",
      value: "Order no",
      order: 0
    },
    {
      key: "total_to_pay",
      value: "Value",
      order: 0
    },
    {
      key: "payment_status",
      value: "Payment status",
      order: 0
    },
    {
      key: "shipping_status",
      value: "Shipping status",
      order: 0
    },
    {
      key: "created_at",
      value: "Created",
      order: -1
    }
  ],
  properties: {
    order_number: {
      header: "Order number",
      width: "14%"
    },
    total_to_pay: {
      header: "Value",
      width: "15%"
    },
    payment_status: {
      header: "Payment status",
      width: "25%",
      render: (v) => (
        <Chip
          color={
            {
              AWT: "info",
              ["PAR/P"]: "info",
              PD: "success",
              RFD: "warning",
              CXL: "error"
            }[v]
          }
          label={
            {
              AWT: "awaiting",
              ["PAR/P"]: "partial payment",
              PD: "paid",
              RFD: "refund",
              CXL: "cancelled"
            }[v]
          }
        />
      )
    },

    shipping_status: {
      header: "Shipping status",
      width: "25%",
      render: (v) => (
        <Chip
          color={
            {
              PREP: "info",
              DSPCH: "info",
              DELIV: "success",
              CXL: "warning"
            }[v]
          }
          label={
            {
              PREP: "preparing",
              DSPCH: "en route",
              DELIV: "delivered",
              CXL: "cancelled"
            }[v]
          }
        />
      )
    },

    created_at: {
      header: "Date",
      width: "15%",
      render: (v) => (
        <>
          <Text variant="body2">{formatDate(v, ".").slice(0, 10)}</Text>
          <Text variant="body2" sx={{ fontStyle: "oblique" }}>
            {formatDate(v, ".").slice(10)}
          </Text>
        </>
      )
    }
  }
};
