import React, { useState } from "react";

import FilesTree from "./FilesTree";
import Topbar from "./Topbar";
import Main from "./Main";
import SearchBar from "./SearchBar";
import ContextMenu from "./ContextMenu";

import { useManager } from "../context";
import Tools from "./Tools";
import Navigation from "./Navigation";

import { Box, Paper, Grid, Text, useTheme, Divider } from "core/ui/_libs";
import { FullscreenImage } from "core/ui";
import { IconMapper } from "core/ui";
import useWindowSize from "core/hooks/useWindowSize";

const FileManager = () => {
  const {
    isMaximized,
    directory,
    fullscreenImage,
    setFullscreenImage,
    navigateFs,
    focusedFile
  } = useManager();

  const theme = useTheme();

  const windowSize = useWindowSize();

  const calculateWidth = (windowSize) => {
    let width;

    switch (true) {
      case windowSize.width <= 1340:
        width = 95;
        break;
      case windowSize.width <= 1980:
        width = 80;
        break;
      case windowSize.width <= 2500:
        width = 60;
        break;
      case windowSize.width <= 3000:
        width = 50;
        break;
      default:
        width = 50;
    }

    return width;
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{
          boxShadow: 2,
          zIndex: 6000,
          position: "fixed",
          // left: "0%",
          // top: "0%",
          // transform: "translateX(50%)"

          [theme.breakpoints.up("md")]: {
            left: isMaximized ? "0%" : "50%",
            top: isMaximized ? "0" : "50%",
            transform: !isMaximized && "translate(-50%, -50%)",
            width: isMaximized ? "100%" : calculateWidth(windowSize) + "%",
            height: isMaximized ? "100%" : "auto"
          },
          [theme.breakpoints.up("xs")]: {
            left: "0%",
            top: "0%",
            // transform: "translate(-50%, -50%)",
            width: windowSize.width,
            overflowY: "auto"
          }

          // left: isMaximized ? "0%" : "50%",
          // top: isMaximized ? "0" : "50%",

          // width: "100%",

          // height: isMaximized ? "100%" : "auto",
          // transform: !isMaximized && "translate(-50%, -50%)",
          // zIndex: 1300
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 1
            // px: 2
          }}
        >
          <Topbar />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            borderBottomColor: "divider",
            borderBottomWidth: "1px",
            borderBottomStyle: "solid"
          }}
        >
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              pd: { xs: 1, md: 3 },
              width: isMaximized ? "15%" : "25%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Tools />
          </Box>

          <Box
            sx={{
              width: {
                xs: "100%",
                md: isMaximized ? "85%" : "75%"
              },
              boxSizing: "border-box",
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row"
              },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              pr: {
                xs: 0,
                md: 3
              },
              ml: {
                xs: 3,
                md: 0
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  xs: "flex-start",
                  md: "center"
                },
                justifyContent: {
                  xs: "flex-start",
                  md: "center"
                }
              }}
            >
              {!focusedFile
                ? null
                : ["public", ...focusedFile.key.split("public")[1].split("/")]
                    .filter((el) => el !== "")
                    .map((subdir, index, self) => {
                      const currKey = self.slice(0, index + 1).join("/");

                      return (
                        <>
                          {index === 0 ? null : (
                            <IconMapper icon="next" color="icons.primary" />
                          )}
                          <Text
                            sx={{
                              cursor: "pointer",
                              "&:hover": {
                                color: "primary.main"
                              }
                            }}
                            onClick={() =>
                              navigateFs(
                                focusedFile.key.split(currKey)[0] + currKey
                              )
                            }
                          >
                            {subdir}
                          </Text>
                        </>
                      );
                    })}
            </Box>
            <SearchBar />
          </Box>
        </Box>
        <Box
          sx={{
            // px: 2,
            mb: 4,
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
            pt: 2,

            height: isMaximized ? "98%" : 700
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                md: isMaximized ? "15%" : "25%"
              },

              height: {
                xs: "auto",
                md: isMaximized ? windowSize.height * 0.9 : "inherit"
              },

              boxSizing: "border-box",
              px: 2
            }}
          >
            <FilesTree />
          </Box>
          {windowSize.width < theme.breakpoints.values.md && (
            <Divider sx={{ backgroundColor: "primary.light", mt: 2 }} />
          )}
          <Box
            sx={{
              height: { xs: "auto", md: "inherit" },
              width: {
                xs: "100%",
                md: isMaximized ? "85%" : "75%"
              },

              boxSizing: "border-box",
              mt: {
                md: 0
              }
            }}
          >
            <Main />
          </Box>
        </Box>
      </Box>
      <ContextMenu />
      <FullscreenImage
        path={fullscreenImage}
        handleClose={() => setFullscreenImage(null)}
      />
    </>
  );
};

export default FileManager;
