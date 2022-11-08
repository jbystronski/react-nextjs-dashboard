import React, { Suspense } from "react";

import {
  Box,
  Paper,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
} from "@mui/material";
import Button from "core/ui/Button";

import IconButton from "core/ui/IconButton";

import IconMapper from "core/ui/icons/IconMapper";
import Image from "core/ui/images/Image";

import dynamic from "next/dynamic";

const PdfInvoice = dynamic(() => import("./PdfInvoice"));

export default function Invoice({ details, showOrder }) {
  const { billing_details: recipient, products: items } = details;

  const [pdf, setPdf] = React.useState(false);

  const vendorCompany = "Company";
  const vendorStreet = "Street address";
  const vendorCity = "City";
  const vendorZipCode = "Zip code";
  const vendorCountry = "Country";
  const vendorEmail = "Email";
  const vendorPhone = "Phone";
  const vendorTaxId = "3125125234";

  const TextCol = ({
    header,
    primary,
    secondary,
    right,
    alignHeader,
    alignText,
    disablePadding,
  }) => {
    return (
      <List
        sx={{ p: disablePadding ? 0 : 2 }}
        dense
        subheader={
          <ListSubheader
            disableGutters
            sx={{
              textTransform: "uppercase",
              textAlign: alignHeader || "right",
              m: 0,
              mb: 1,
              backgroundColor: "transparent",
              // fontSize: "0.75rem",
              lineHeight: "1rem",
              fontWeight: 600,
            }}
          >
            {header}
          </ListSubheader>
        }
      >
        {primary &&
          primary.map((v, index) => (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={right && right[index]}
            >
              <ListItemText
                sx={{ m: 0 }}
                primary={v}
                secondary={secondary && secondary[index]}
                primaryTypographyProps={{
                  variant: "body1",
                  textAlign: alignText || "left",
                }}
                secondaryTypographyProps={{
                  variant: "body2",
                }}
              />
            </ListItem>
          ))}
      </List>
    );
  };

  const Issuer = () => (
    <TextCol
      header="Issued by"
      alignHeader="left"
      primary={[
        vendorCompany,
        vendorStreet,
        vendorZipCode + ", " + vendorCity,
        vendorCountry,
      ]}
    />
  );

  const Vendor = () => (
    <Stack>
      <Logo />
      <TextCol
        primary={[
          vendorCompany,
          vendorStreet,
          vendorZipCode + ", " + vendorCity,
          vendorEmail,
          vendorPhone,
          vendorCountry,
          "TAX ID: 8312983890",
        ]}
      />
    </Stack>
  );

  const InvoiceNo = () => (
    <TextCol header="invoice no" alignHeader="left" primary={["#4654367"]} />
  );

  const DueDate = () => (
    <TextCol header="due" alignHeader="left" primary={["27/02/2022"]} />
  );

  const DateOfIssue = () => (
    <TextCol header="issue date" alignHeader="left" primary={["02/02/2022"]} />
  );

  const Logo = () => (
    <Image path={"/images/logo.svg"} bg="transparent" size="small" />
  );

  const MiddleSection = (props) => (
    <Stack direction="row" justifyContent="flex-start" sx={{ mt: 1 }}>
      {props.children}
    </Stack>
  );

  const Recipient = () => (
    <TextCol
      alignHeader="left"
      header="Recipient"
      primary={[
        recipient.first_name + " " + recipient.last_name,
        recipient.company,
        "Tax Id " + recipient.tax_id,
        recipient.street,
        recipient.zip_code + ", " + recipient.city,
        recipient.country,
      ]}
    />
  );

  const Items = ({ items }) => {
    const withDivider = (val) => (
      <>
        <Box sx={{ my: 1 }}>{val}</Box> <Divider />
      </>
    );

    const data = [
      {
        w: "30%",
        header: "Name",
        alignHeader: "left",
        primary: items.map((i) => withDivider(i.name)),
      },
      {
        w: "15%",
        header: "SKU",
        alignHeader: "left",
        primary: items.map((i) => withDivider(i.code)),
      },
      {
        w: "5%",
        header: "Qty",
        alignText: "right",
        primary: items.map((i) => withDivider(i.qty)),
      },
      {
        w: "20%",
        header: "Unit price",
        alignText: "right",
        primary: items.map((i) =>
          withDivider("$" + i.unit_price_wo_tax.toFixed(2))
        ),
      },
      {
        w: "15%",
        header: "Tax",
        alignText: "right",
        primary: items.map((i) =>
          withDivider(
            "$" + (i.unit_price_w_tax - i.unit_price_wo_tax).toFixed(2)
          )
        ),
      },
      {
        w: "20%",
        header: "Total",
        alignText: "right",
        primary: items.map((i) =>
          withDivider("$" + i.product_total.toFixed(2))
        ),
      },
    ];

    return (
      <Stack direction="row">
        {data.map((d) => (
          <Box key={d.header} sx={{ width: d.w }}>
            <TextCol
              disablePadding={true}
              header={d.header}
              alignText={d.alignText}
              alignHeader={d.alignHeader}
              primary={d.primary}
            />
          </Box>
        ))}
      </Stack>
    );
  };

  const alignOpposite = (left, right) => (
    <Stack direction="row" justifyContent="space-between">
      <span style={{ width: "150px", textAlign: "right" }}>{left}</span>
      <span style={{ width: "130px", textAlign: "right" }}>{right}</span>
    </Stack>
  );

  const Summary = () => (
    <TextCol
      disablePadding={true}
      header="Summary"
      alignHeader="right"
      primary={[
        alignOpposite("Transfer charges", "excluded"),
        alignOpposite(
          "Shipping fee",
          "$" + (details.shipping_fee * 1).toFixed(2)
        ),

        alignOpposite(
          "Tax",
          "$" + (details.total - details.subtotal).toFixed(2)
        ),
        alignOpposite("Amount paid", "$" + (0).toFixed(2)),
        alignOpposite("Amount left", "$" + details.total_to_pay.toFixed(2)),
      ]}
    />
  );

  return (
    <>
      {!pdf ? (
        <>
          <Box
            component={Paper}
            sx={{
              bgcolor: "background.dark",
              // bgcolor: "#FFF",
              // color: "#000",
              // fontSize: "0.75rem",
              p: 4,
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", right: 4 * 4, top: 4 * 4 }}>
              <IconButton
                tooltip="View PDF"
                icon={<IconMapper icon="search" />}
                onClick={() => setPdf(!pdf)}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Vendor />
              <Box sx={{ pr: 2 }}>
                <Typography variant="h6">#89584</Typography>
              </Box>
            </Stack>
            <Divider />
            <Stack justifyContent="flex-start" direction="row" sx={{ my: 2 }}>
              <InvoiceNo />
              <DateOfIssue />
              <DueDate />
            </Stack>
            <MiddleSection>
              <Issuer header="Issued by:" />
              <Recipient recipient={recipient} />
            </MiddleSection>
            <Box sx={{ mt: 2 }}>
              <Items items={items} />
            </Box>
            <Stack flexDirection="row" justifyContent="flex-end" sx={{ my: 2 }}>
              <Summary />
            </Stack>
          </Box>
          <Stack justifyContent="flex-end" direction="row" sx={{ mt: 4 }}>
            <Button label="Show order" onClick={showOrder} />
          </Stack>
        </>
      ) : (
        <Suspense fallback={<div>Loading invoice...</div>}>
          <Box
            id="pdf_container"
            sx={{
              zIndex: 6000,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <PdfInvoice
              close={() => setPdf(false)}
              data={{
                vendor: {
                  city: vendorCity,
                  country: vendorCountry,
                  phone: vendorPhone,
                  zipCode: vendorZipCode,
                  street: vendorStreet,
                  company: vendorCompany,
                  taxId: vendorTaxId,
                  email: vendorEmail,
                },
                client: recipient,
                items: {
                  names: items.map((i) => i.name),
                  codes: items.map((i) => i.code),
                  qts: items.map((i) => i.qty),
                  unit_prices: items.map((i) => i.unit_price_wo_tax.toFixed(2)),
                  taxes: items.map((i) =>
                    (i.unit_price_w_tax - i.unit_price_wo_tax).toFixed(2)
                  ),
                  totals: items.map((i) => i.product_total.toFixed(2)),
                },
                summary: {
                  total: details.total_to_pay.toFixed(2),
                  shipping_fee: (details.shipping_fee * 1).toFixed(2),
                  tax: (details.total - details.subtotal).toFixed(2),
                  amount_paid: (0).toFixed(2),
                },
              }}
              logoUrl={"/images/logo.png"}
            />
          </Box>
        </Suspense>
      )}
    </>
  );
}
