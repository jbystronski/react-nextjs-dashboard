import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFetch } from "core/hooks";
import { UiAvatar, LinkIconButton, IconButton, IconMapper } from "core/ui";
import {
  Text,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Box,
  Divider,
  TextField
} from "core/ui/_libs";

export default function ProductList({ orderProducts, productIds }) {
  const router = useRouter();
  const { data: images, error } = useFetch(
    `/api/db/find/products?_id._in=${productIds}&_only=primary_image,_id`,
    { init: null }
  );

  const headers = [
    "Image",
    "Name",
    "Qty",
    "Unit price",
    "Amount",
    "Link",
    "Delete"
  ];

  const getHeader = (innerText) => {
    return (
      <TableCell key={innerText}>
        <Text variant="body1">{innerText}</Text>
      </TableCell>
    );
  };

  const getCell = (innerText) => {
    return (
      <TableCell>
        <Text variant="body1">{innerText}</Text>
      </TableCell>
    );
  };

  const getImage = (images, product_id) => {
    const img = images.find((el) => el._id === product_id);

    return img ? (
      <UiAvatar
        styling={{ borderRadius: "8px" }}
        size={[46, 46]}
        path={img.primary_image ? img.primary_image : null}
        fallback={<IconMapper icon="image_file" color="primary.light" />}
      />
    ) : null;
  };

  return (
    <TableContainer sx={{ overflow: "auto" }}>
      <Table>
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
        </colgroup>
        <TableHead>
          <TableRow>{headers.map((el) => getHeader(el))}</TableRow>
        </TableHead>
        <TableBody>
          {orderProducts.map((product) => (
            <TableRow key={product.product_id}>
              <TableCell>
                {images && getImage(images, product.product_id)}
              </TableCell>
              {getCell(product.name)}
              <TableCell>{product.qty}</TableCell>

              {getCell(product.unit_price_w_tax)}
              {getCell(product.product_total)}
              <TableCell>
                <LinkIconButton
                  onClick={() =>
                    router.push({
                      pathname: "/admin/forms/edit/[model]/[id]",
                      query: { id: product.product_id, model: "products" }
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <IconButton
                  icon={
                    <IconMapper
                      icon="x"
                      fontSize="small"
                      color="icons.primary"
                    />
                  }
                  onClick={() => alert("delete")}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
