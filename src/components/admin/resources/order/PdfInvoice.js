import React from "react";
import { lazily } from "react-lazily";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
  LinearGradient,
  Svg,
  Path,
  Stop,
  Defs,
  Circle
} from "@react-pdf/renderer";
import { Box, Stack } from "core/ui/_libs";
import { UiButton } from "core/ui";

export default function PdfInvoice({ close, logoUrl, data }) {
  const {
    vendor,
    client,
    items: { names, taxes, qts, unit_prices, totals, codes },
    summary
  } = data;

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFF",
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: 10,
      padding: 24
    },

    middleSection: {
      backgroundColor: "#f2f5f7"
    },

    w30: {
      width: "30%"
    },

    w15: {
      width: "15%"
    },
    w5: {
      width: "5%"
    },

    w20: {
      width: "20%"
    },

    colRight: {
      alignItems: "flex-end"
    },
    colLeft: {
      alignItems: "flex-start"
    },

    padded: {
      padding: 16
    },

    header: {
      color: "#666",
      fontSize: 10,
      textTransform: "uppercase",
      marginBottom: 4,
      fontWeight: "bold"
    },

    col: {
      display: "flex",
      flexDirection: "column"
    },

    marginBottom: {
      marginBottom: 16
    },

    row: {
      display: "flex",
      flexDirection: "row"
    },

    rowStart: {
      justifyContent: "flex-start"
    },

    rowEnd: {
      justifyContent: "flex-end"
    },

    fw: {
      width: "100%",
      textAlign: "right"
    },

    item: {
      width: "100%",
      paddingBottom: 4,
      paddingTop: 4,
      borderBottom: "1px solid #666"
    },

    right: {
      textAlign: "right"
    },

    left: {
      textAlign: "left"
    },

    divider: {
      borderColor: "#666",
      borderStyle: "solid",
      borderWidth: 1,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      display: "flex",
      flexDirection: "row"
    },

    logoImg: {
      width: 40,
      height: 40,
      marginBottom: 16
    }
  });

  const parseSvg = async (url) => {
    const matchAll = (str, search) =>
      [...str.matchAll(new RegExp(search, "gi"))]
        .map((a) => a.index)
        .map((startIndex) => {
          const trimmed = str.slice(startIndex + search.length + 2);

          return trimmed.slice(0, trimmed.indexOf('"'));
        });

    const res = await fetch(url);
    const svg = await res.text();

    const container = {
      viewBox: matchAll(svg, "viewBox")[0],
      xmlns: matchAll(svg, "xmlns")[0],
      height: matchAll(svg, "height")[0],
      width: matchAll(svg, "width")[0],
      preserveAspectRatio: matchAll(svg, "preserveAspectRatio")[0],
      d: matchAll(svg, "path d")[0],
      fill: matchAll(svg, "fill")[0],
      defs: {
        linearGradient: {
          ["x1"]: matchAll(svg, "x1")[0],
          ["y1"]: matchAll(svg, "y1")[0],
          ["x2"]: matchAll(svg, "x2")[0],
          ["y2"]: matchAll(svg, "y2")[0],
          colors: matchAll(svg, "stop stop-color"),
          offsets: matchAll(svg, "offset")
        }
      }
    };

    return container;
  };

  const mergeStyles = (stylesheet, ...args) => {
    let merged = {};

    args.forEach((style) => {
      merged = { ...merged, ...stylesheet[style] };
    });

    return merged;
  };

  return (
    <Stack
      direction="column"
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
      }}
    >
      <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
        <UiButton label="Back" onClick={close} />
      </Stack>

      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Image src={logoUrl} style={styles.logoImg} />
              <View style={styles.marginBottom}>
                <Text>{vendor.company}</Text>
                <Text>{vendor.taxtId}</Text>
                <Text>{vendor.street}</Text>
                <Text>{vendor.zipCode + ", " + vendor.city}</Text>
                <Text>{vendor.country}</Text>
                <Text>{vendor.email}</Text>
                <Text>{vendor.phone}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={mergeStyles(styles, "row", "rowStart")}>
              <View style={mergeStyles(styles, "col", "padded")}>
                <Text style={styles.header}>Invoice no</Text>
                <Text>78733</Text>
              </View>
              <View style={mergeStyles(styles, "col", "padded")}>
                <Text style={styles.header}>Issue date</Text>
                <Text>02/02/2022</Text>
              </View>
              <View style={mergeStyles(styles, "col", "padded")}>
                <Text style={styles.header}>Due</Text>
                <Text>22/02/2022</Text>
              </View>
            </View>
            <View style={styles.middleSection}>
              <View style={mergeStyles(styles, "row", "rowStart")}>
                <View style={mergeStyles(styles, "col", "padded")}>
                  <Text style={styles.header}>Issued by</Text>
                  <Text>{vendor.company}</Text>
                  <Text>{vendor.taxtId}</Text>
                  <Text>{vendor.street}</Text>
                  <Text>{vendor.zipCode + ", " + vendor.city}</Text>
                  <Text>{vendor.country}</Text>
                </View>

                <View style={mergeStyles(styles, "col", "padded")}>
                  <Text style={styles.header}>Recipient</Text>
                  <Text>{client.first_name + " " + client.last_name}</Text>
                  <Text>{client.company}</Text>
                  <Text>{client.street}</Text>
                  <Text>{client.zip_code + ", " + client.city}</Text>
                  <Text>{client.country}</Text>
                </View>
              </View>
            </View>
            <View style={mergeStyles(styles, "row", "rowStart", "padded")}>
              <View style={mergeStyles(styles, "colLeft", "w30")}>
                <Text style={styles.header}>ITEM</Text>
                {names.map((i, key) => (
                  <Text
                    key={"name" + key}
                    style={mergeStyles(styles, "item", "left")}
                  >
                    {i}
                  </Text>
                ))}
              </View>
              <View style={mergeStyles(styles, "colLeft", "w15")}>
                <Text style={styles.header}>CODE</Text>
                {codes.map((i, key) => (
                  <Text
                    key={"code" + key}
                    style={mergeStyles(styles, "item", "left")}
                  >
                    {i}
                  </Text>
                ))}
              </View>
              <View style={mergeStyles(styles, "colRight", "w5")}>
                <Text style={styles.header}>QTY</Text>
                {qts.map((i, key) => (
                  <Text
                    key={"qty" + key}
                    style={mergeStyles(styles, "item", "right")}
                  >
                    {i}
                  </Text>
                ))}
              </View>
              <View style={mergeStyles(styles, "colRight", "w20")}>
                <Text style={styles.header}>UNIT PRICE</Text>
                {unit_prices.map((i, key) => (
                  <Text
                    key={"unit" + key}
                    style={mergeStyles(styles, "item", "right")}
                  >
                    {i}
                  </Text>
                ))}
              </View>
              <View style={mergeStyles(styles, "colRight", "w15")}>
                <Text style={styles.header}>TAX</Text>
                {taxes.map((i, key) => (
                  <Text
                    key={"tax" + key}
                    style={mergeStyles(styles, "item", "right")}
                  >
                    {i}
                  </Text>
                ))}
              </View>
              <View style={mergeStyles(styles, "colRight", "w20")}>
                <Text style={styles.header}>TOTAL</Text>
                {totals.map((i, key) => (
                  <Text
                    key={"total" + key}
                    style={mergeStyles(styles, "item", "right")}
                  >
                    {i}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.padded}>
              <View style={mergeStyles(styles, "row", "rowEnd")}>
                <View style={mergeStyles(styles, "colRight", "w20")}>
                  <Text style={styles.header}>Summary</Text>
                </View>
              </View>
              <View style={mergeStyles(styles, "row", "rowEnd")}>
                <View style={mergeStyles(styles, "colLeft", "w15")}>
                  <Text>Transfer charges</Text>
                  <Text>Shipping fee</Text>
                  <Text>Tax</Text>
                  <Text>Amount paid</Text>
                  <Text>Left to pay</Text>
                </View>
                <View style={mergeStyles(styles, "colRight", "w15")}>
                  <Text>excluded</Text>
                  <Text>{summary.shipping_fee}</Text>
                  <Text>{summary.tax}</Text>
                  <Text>{summary.amount_paid}</Text>
                  <Text>{summary.total}</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Stack>
  );
}
