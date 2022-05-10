import { Paper, Grid, Box, Stack } from "core/ui/_libs";
import {
  UsersChart,
  OrdersChart,
  UsersList,
  OrdersTimeline,
  BestsellersList
} from ".";
import { Loader } from "core/ui";
import WeatherWidget from "jb-react-weather-widget";
import { useTheme } from "@mui/styles";
import { useWindowSize } from "core/hooks";

const ChartsLayout = () => {
  const { palette: colors, breakpoints } = useTheme();
  const windowSize = useWindowSize();

  return (
    <Stack
      sx={{ width: "100%" }}
      direction={{
        xs: "column",
        md: "column",
        lg: "row"
      }}
    >
      <Stack direction="column" sx={{ width: { lg: "65%" } }}>
        <Box
          sx={{
            width: {
              xs: windowSize.width - 16,
              sm: "auto"
            },
            overflow: "auto"
            // width: {
            //   xs: windowSize.width
            // }
          }}
        >
          <Paper
            sx={{
              overflow: "auto",
              mb: {
                lg: 4,
                sm: 3
              }
            }}
          >
            <WeatherWidget
              apiKey={process.env.weather_app_key}
              units="metric"
              theme={{
                color: {
                  font: {
                    main: colors.text.primary,
                    timer: colors.secondary.light,
                    right: colors.text.primary,
                    bottom: colors.text.primary
                  },
                  icon: {
                    main: colors.secondary.main,
                    right: colors.secondary.main,
                    bottom: colors.secondary.main
                  }
                },
                bg: {
                  main: colors.background.paper,
                  right: colors.background.dark,
                  bottom: colors.background.dark
                },
                spacing: {
                  inner: "16px"
                },
                borderRadius: {
                  element: "8px",
                  container:
                    windowSize.width <= breakpoints.values.md ? 0 : "8px",
                  element:
                    windowSize.width <= breakpoints.values.sm ? "0px" : "8px"
                }
              }}
            />
          </Paper>
        </Box>

        <Box
          sx={{
            width: {
              xs: windowSize.width - 10,
              sm: "auto"
            },
            overflow: "auto",
            mb: { lg: 4, md: 3, sm: 3, xs: 0 }
            // width: {
            //   xs: windowSize.width
            // }
          }}
        >
          <UsersChart />
        </Box>
        <Box
          sx={{
            // width: { xs: windowSize.width },
            mb: { lg: 4, md: 3, sm: 3, xs: 0 }
          }}
        >
          <OrdersChart />
        </Box>
      </Stack>
      <Stack
        direction="column"
        sx={{
          width: {
            xs: "100%",
            lg: "35%"
          },
          pl: { xs: 0, sm: 0, md: 0, lg: 4 }
        }}
      >
        <Box sx={{ mb: { xl: 4, md: 3, sm: 3, xs: 0 } }}>
          <Paper
            style={{
              overflow: "hidden"
              // widht: {
              //   xs: windowSize.width
              // }
            }}
          >
            <UsersList />
          </Paper>
        </Box>

        <Box
          sx={{
            mb: { xs: 0, sm: 3, md: 3, lg: 4, xl: 4 }
            // width: {
            //   xs: windowSize.width
            // }
          }}
        >
          <Paper style={{ overflow: "hidden" }}>
            <BestsellersList />
          </Paper>
        </Box>
        <Box sx={{ mb: { xs: 0, sm: 3, md: 3, xl: 4 } }}>
          <Paper style={{ overflow: "hidden" }}>
            <OrdersTimeline />
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ChartsLayout;
