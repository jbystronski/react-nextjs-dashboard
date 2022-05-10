import React from "react";
import { useManager } from "../context";
import { Box, ThemeProvider, createTheme } from "core/ui/_libs";
import { DeepNestedList } from "core/ui";
import { useTheme } from "@mui/styles";
import DocumentIcon from "../ui/DocumentIcon";

function FilesTree() {
  const { palette } = useTheme();

  const { data, navigateFs, handleContextMenu } = useManager();

  return (
    <Box sx={{ overflowY: "auto", height: "inherit" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              styleOverrides: {
                root: {
                  paddingLeft: 10,
                  paddingRight: 24,
                  fontSize: { xs: "0.875rem", md: "0.7rem" },
                  paddingTop: 2,
                  paddingBottom: 2,
                  "&.Mui-selected": {
                    backgroundColor: "#D8DEE9"
                  }
                }
              },
              defaultProps: {
                disableTouchRipple: true
              }
            },
            MuiListItemIcon: {
              styleOverrides: {
                root: {
                  minWidth: "10px",
                  marginRight: "8px"
                }
              }
            },
            MuiCollapse: {
              styleOverrides: {
                root: {
                  borderLeftWidth: "1px",
                  borderLeftStyle: "dashed",
                  borderLeftColor: palette.icons.primary,
                  marginLeft: 24
                }
              }
            }
          },
          palette: palette
        })}
      >
        {data && data.root && (
          <DeepNestedList
            listItemProps={{
              onContextMenu: handleContextMenu
            }}
            listProps={{
              disablePadding: true
            }}
            getIcon={(v) => (
              <DocumentIcon
                ext={v.split(".").slice(-1).join("") || ""}
                fontSize="small"
              />
            )}
            onClickCallback={(key) => navigateFs(key)}
            expansionIndicatorProps={{
              sx: {
                color: palette.icons.secondary
              }
            }}
            nodes={data.root.children}
          />
        )}
      </ThemeProvider>
    </Box>
  );
}

export default FilesTree;
