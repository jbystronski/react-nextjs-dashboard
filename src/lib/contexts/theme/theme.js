import { createTheme } from "@mui/material/styles";

import createBreakpoints from "@mui/system/createTheme/createBreakpoints";

const breakpoints = createBreakpoints({
  xs: 0,
  sm: 640,
  md: 900,
  lg: 1920,
  xl: 3840,
});

const mountTheme = (values) => {
  const dark = values.mode === "dark";

  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 900,
        lg: 1920,
        xl: 2560,
      },
    },

    palette: {
      ...values,
      action: {
        active: values.primary.main,
        activatedOpacity: 1,
      },
    },

    typography: {
      fontFamily: ["Open Sans", "Lato", "Nunito", "Poppins"].join(","),
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            fontSize: "16px",
            [breakpoints.down("lg")]: {
              fontSize: "16px",
            },

            [breakpoints.down("md")]: {
              fontSize: "13px",
            },
            [breakpoints.down("sm")]: {
              fontSize: "14px",
            },
            [breakpoints.down("xs")]: {
              fontSize: "11px",
            },
            fontFamily: ["Open Sans", "Lato", "Nunito", "Poppins"].join(","),
          },
          body: {
            fontFamily: ["Open Sans", "Lato", "Nunito", "Poppins"].join(","),
            fontSize: "14px",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            overflow: "hidden",
            backgroundImage: "none",
            backgroundColor: values.background.paper,
          },
          elevation1: {
            boxShadow: "none",
          },
          borderRadius: "8px",
          rounded: {
            [breakpoints.only("xs")]: {
              borderRadius: 0,
              m: 0,
              borderBottom: "1px solid " + values.divider,
            },
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            "&.Mui-checked": {
              color: values.secondary.light,
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: values.input,
            borderRadius: "8px",
          },
          input: {
            borderRadius: "8px",
          },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            marginTop: "2px",
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: values.primary.main,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            paddingRight: "8px",
          },
          notchedOutline: {
            border: values.inputBorder || "none",
          },
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&.Mui-hovered": {
              color: "#fff",
            },
            "&.Mui-selected": {
              backgroundColor: values.primary.main,
              color: values.text.secondary,
              "&.Mui-focusVisible": { background: values.primary.main },
            },
          },
        },
      },

      MuiListItem: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              color: values.primary.light,
            },
          },
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: values.primary.light,
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: values?.background?.dark,
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: values.divider,
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:last-of-type td": {
              borderBottom: 0,
            },
            "&:first-of-type th": {
              borderBottom: 0,
            },
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: values.icons.primary,
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
    },
  });
};

export default mountTheme;
