import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Main from "./Main";
import { AdminContextProvider, AppThemeProvider } from "lib/contexts";
import { Box, CssBaseline, Stack } from "@mui/material";

const Layout = (props) => {
  return (
    <AppThemeProvider>
      <AdminContextProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 5000,
            }}
          >
            <Header />
          </Box>
          <Box
            sx={{
              mt: { xl: "140px", sm: "86px", xs: "56px" },

              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              sx={{
                width: {
                  xs: "100%",
                  sm: "90%",
                  md: "95%",
                  lg: "85%",
                  xl: "50%",
                },
              }}
              spacing={{
                lg: 4,
                md: 3,
                sm: 0,
                xs: 0,
              }}
            >
              <Box
                sx={{
                  width: {
                    xl: "25%",
                    lg: "20%",
                    md: "25%",
                  },
                }}
              >
                <Navigation />
              </Box>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "75%",
                    lg: "80%",
                    xl: "90%",
                  },
                }}
              >
                <Main>{props.children}</Main>
              </Box>
            </Stack>
          </Box>
        </Box>
      </AdminContextProvider>
    </AppThemeProvider>
  );
};

export const getLayout = (page) => <Layout>{page}</Layout>;

export default Layout;
