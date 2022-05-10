import { IconButton, Select, LinkIconButton, Loader } from "core/ui";

import {
  Box,
  Text,
  Stack,
  Checkbox,
  Paper,
  TableRow,
  TableHead,
  TableFooter,
  TableContainer,
  TableCell,
  TableBody,
  Table as UiTable
} from "core/ui/_libs";

function Table({
  model,
  data,
  tableProps,
  redirect,
  checked,
  handleCheck,
  allChecked,
  handleCheckAll
}) {
  const dataKeys = Object.keys(tableProps);

  const headers = Object.keys(tableProps).map(
    (key) => tableProps[key]["header"]
  );

  const widths = Object.keys(tableProps).map((k) => tableProps[k]["width"]);

  return (
    <>
      {data ? (
        <Box>
          <TableContainer>
            <UiTable>
              <colgroup>
                <col style={{ width: "3%" }} />
                {widths.map((w, index) => (
                  <col key={w + index} style={{ width: w }} />
                ))}
                <col style={{ width: "3%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={allChecked}
                      onChange={handleCheckAll}
                    />
                  </TableCell>
                  {headers.map((header) => (
                    <TableCell key={header}>
                      <Text variant="body2">{header}</Text>
                    </TableCell>
                  ))}
                  <TableCell>
                    <Text align="justify" variant="body2">
                      Link
                    </Text>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ bgcolor: "surface.light" }}>
                {data.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell key={row["_id"]}>
                        <Checkbox
                          size="small"
                          id={row["_id"]}
                          checked={checked.includes(row["_id"])}
                          onChange={handleCheck}
                        />
                      </TableCell>

                      {dataKeys.map((key) => {
                        return (
                          key in row && (
                            <TableCell key={key} component="td" scope="row">
                              {"render" in tableProps[key] ? (
                                tableProps[key].render(row[key])
                              ) : (
                                <Text variant="body2">{row[key]}</Text>
                              )}
                            </TableCell>
                          )
                        );
                      })}

                      <TableCell align="justify">
                        <LinkIconButton
                          onClick={() => redirect(model, row["_id"])}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </UiTable>
          </TableContainer>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Table;
