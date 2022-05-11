import { Text, Avatar } from "core/ui/_libs";
import { lazy, Suspense } from "react";
import { Rating, IconMapper, UiAvatar } from "core/ui";
const Image = lazy(() => import("core/ui/images/Image"));
import { formatDate } from "core/utils/dateHelpers";

module.exports = {
  title: "Products",
  subRoute: "forms/edit",
  defaultSort: { updated_at: -1 },
  defaultSearch: "name",

  sortable: [
    {
      key: "name",
      value: "Product",
      order: 0
    },
    {
      key: "in_stock",
      value: "Stock",
      order: 0
    },
    {
      key: "price_w_tax",
      value: "Price",
      order: 0
    },
    {
      key: "code",
      value: "SKU",
      order: 0
    },
    {
      key: "category",
      value: "Category",
      order: 0
    },
    {
      key: "rating",
      value: "Score",
      order: 0
    },
    {
      key: "updated_at",
      value: "Modified",
      order: 0
    }
  ],

  searchable: [
    { key: "name", value: "Product" },
    { key: "code", value: "SKU" },
    { key: "category", value: "Category" }
  ],

  properties: {
    primary_image: {
      header: "Image",
      width: "4%",
      render: (path) => (
        <Suspense fallback={<p>Loading</p>}>
          <UiAvatar
            styling={{ borderRadius: "8px" }}
            size={[46, 46]}
            path={path ? path : null}
            fallback={<IconMapper icon="image_file" color="primary.light" />}
          />
        </Suspense>
      )
    },
    name: {
      header: "Product name",
      sortable: true,
      width: "25%"
    },
    category: {
      header: "Category",
      sortable: true,
      width: "10%"
    },
    code: {
      header: "SKU",
      sortable: true,
      width: "10%"
    },

    published: {
      header: "Published",
      width: "5%",

      render: (v) => (
        <IconMapper
          icon="check_circle"
          fontSize="small"
          color={v ? "icons.secondary" : "disabled"}
        />
      )
    },
    in_stock: {
      header: "In stock",
      sortable: true,
      width: "10%"
    },
    price_w_tax: {
      header: "Price",
      sortable: true,
      width: "10%"
    },
    rating: {
      header: "Rating",
      sortable: true,
      width: "10%",
      render: (v) => <Rating size="small" value={v} readOnly />
    },
    updated_at: {
      header: "Modified",
      sortable: true,
      width: "10%",
      render: (v) => <Text variant="body2">{formatDate(v, ".")}</Text>
    }
  }
};
