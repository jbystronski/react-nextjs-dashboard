import { formatDate } from "core/utils/dateHelpers";

import { Typography } from "@mui/material";
import IconMapper from "core/ui/icons/IconMapper";

import Avatar from "core/ui/Avatar";

module.exports = {
  title: "Users",
  subRoute: "resources",
  defaultSearch: "last_name",

  searchable: [
    {
      key: "first_name",
      value: "First name",
    },
    {
      key: "last_name",
      value: "Last name",
    },
    {
      key: "email",
      value: "Email",
    },
    {
      key: "city",
      value: "City",
    },
    {
      key: "country",
      value: "Country",
    },
  ],
  defaultSort: { created_at: -1 },
  sortable: [
    {
      key: "first_name",
      value: "First name",
      order: 0,
    },
    {
      key: "last_name",
      value: "Last name",
      order: 0,
    },
    {
      key: "email",
      value: "Email",
      order: 0,
    },
    {
      key: "city",
      value: "City",
      order: 0,
    },
    {
      key: "country",
      value: "Country",
      order: 0,
    },
    {
      key: "created_at",
      value: "Joined",
      order: -1,
    },
  ],
  properties: {
    img: {
      header: "Image",
      width: "6%",
      render: (img) => (
        <Avatar
          size={[50, 50]}
          path={img || undefined}
          fallback={<IconMapper icon="user" sx={{ color: "primary.light" }} />}
        />
      ),
    },

    first_name: {
      header: "First name",
      width: "10%",
    },
    last_name: {
      header: "Last name",
      width: "15%",
    },
    email: {
      header: "Email",
      width: "9%",
    },

    street: {
      header: "Street",
      width: "22%",
    },

    city: {
      header: "City",
      width: "13%",
    },

    country: {
      header: "Country",
      width: "10%",
    },

    created_at: {
      header: "Joined",
      width: "10%",
      render: (v) => <Typography variant="body2">{formatDate(v)}</Typography>,
    },
  },
};
