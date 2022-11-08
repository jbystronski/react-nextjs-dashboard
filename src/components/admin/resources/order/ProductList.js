import React from "react";
import { useRouter } from "next/router";
import { useFetch } from "core/hooks";

import IconMapper from "core/ui/icons/IconMapper";
import LinkIconButton from "core/ui/LinkIconButton";
import IconButton from "core/ui/IconButton";

import {
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
} from "@mui/material";

import Avatar from "core/ui/Avatar";

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
    "Delete",
  ];

  const getHeader = (innerText) => {
    return (
      <TableCell key={innerText}>
        <Typography variant="body1">{innerText}</Typography>
      </TableCell>
    );
  };

  const getCell = (innerText) => {
    return (
      <TableCell>
        <Typography variant="body1">{innerText}</Typography>
      </TableCell>
    );
  };

  const getImage = (images, product_id) => {
    const img = images.find((el) => el._id === product_id);

    return img ? (
      <Avatar
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
          {[10, 20, 20, 20, 20, 5, 5].map((percent, i) => (
            <col key={i + percent / 2 + ""} style={{ width: percent + "%" }} />
          ))}
        </colgroup>
        <TableHead>
          <TableRow>
            {headers.map((el, i) => (
              <React.Fragment key={el + i}>{getHeader(el)}</React.Fragment>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderProducts.map((product) => (
            <TableRow key={product.product_id + product.name}>
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
                      query: { id: product.product_id, model: "products" },
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => alert("delete")}>
                  <IconMapper icon="x" fontSize="small" color="icons.primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
