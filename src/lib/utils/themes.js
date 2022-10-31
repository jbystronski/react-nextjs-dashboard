const themes = {
  nordic: {
    name: "nordic",
    mode: "dark",
    values: {
      primary: {
        main: "#66B9CC",
        light: "#84C7D6",
        dark: "#47818E",
        contrastText: "#D8DEE9",
      },
      secondary: {
        main: "#D8DEE9",
        light: "#DFE4ED",
        dark: "#979BA3",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },

      icons: { primary: "#84C7D6", secondary: "#D08770" },

      misc: ["#BF616A", "#D08770", "#EBCB8B", "#A3BE8C", "#B48EAD"],

      error: {
        light: "#CB8087",
        main: "#bf616a",
        dark: "#85434A",
        contrastText: "#FFF",
      },
      warning: {
        light: "#D99F8C",
        main: "#d08770",
        dark: "#915E4E",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      info: {
        light: "#7E9ABC",
        main: "#5e81ac",
        dark: "#415A78",
        contrastText: "#FFF",
      },
      success: {
        light: "#B5CBA3",
        main: "#a3be8c",
        dark: "#728562",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      input: "rgba(0,0,0,0.18)",
      highlight: "rgba(0,0,0,0.1)",
      navigation: {
        main: "#DFE4ED",
        hover: "#66B9CC",
        accent: "#66B9CC",
      },

      background: {
        paper: "#2E3440",
        image: "#D8DEE9",
        default: "#111318",
        dark: "rgba(0,0,0,0.1)",
      },
      text: {
        primary: "#eceff4",
      },
    },
  },

  "nordic light": {
    mode: "light",
    name: "nordic light",
    values: {
      primary: {
        main: "#88C0D0",
        light: "#A5C9C8",
        dark: "#648382",
        contrastText: "#fbfbfc",
      },
      secondary: {
        main: "#D08770",
        light: "#88c0d0",
        dark: "#d08770",
        contrastText: "#ffffff",
      },
      text: {
        primary: "#4c566a",
        secondary: "#4c566a",
      },

      input: "transparent",
      inputBorder: "1 px solid #d7dbda",

      icons: { primary: "#56698a", secondary: "#81A1C1" },

      navigation: {
        main: "#4c566a",
        hover: "#88C0D0",
        accent: "#88C0D0",
      },

      misc: ["#BF616A", "#D08770", "#EBCB8B", "#A3BE8C", "#B48EAD"],
      background: {
        default: "#e5e9f0",
        paper: "#ECEFF4",
        dark: "rgba(0,0,0,0.017)",
        image: "#e5e9f0",
      },
      header: "#88C0D0",

      error: {
        light: "#CB8087",
        main: "#bf616a",
        dark: "#85434A",
        contrastText: "#FFF",
      },
      warning: {
        light: "#D99F8C",
        main: "#d08770",
        dark: "#915E4E",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      info: {
        light: "#7E9ABC",
        main: "#5e81ac",
        dark: "#415A78",
        contrastText: "#FFF",
      },
      success: {
        light: "#B5CBA3",
        main: "#a3be8c",
        dark: "#728562",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      nav: {
        icon: "#56698a",
        text: "#56698a",
      },
    },
  },

  purple: {
    name: "purple",
    mode: "light",
    values: {
      primary: {
        light: "#9F7CE3",
        main: "#875cdd",
        dark: "#5E409A",
        contrastText: "#fff",
      },
      divider: "#381877",
      highlight: "#875CDD",

      secondary: {
        light: "#DD6CCD",
        main: "#d548c1",
        dark: "#953287",
        contrastText: "#fff",
      },

      icons: { primary: "#525f7f", secondary: "#875cdd" },
      misc: ["#d548c1", "#ff546a", "#ff3e98", "#ff7d3d", "#ffa600"],

      text: {
        primary: "#1b1f22",
        secondary: "#1b1f22",
      },
      success: {
        main: "#A7B32A",
        light: "#B8C254",
        dark: "#747D1D",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      warning: {
        main: "#B6A32B",
        light: "#C4B555",
        dark: "#7F721E",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      info: {
        light: "#875CDD",
        main: "#6a34d5",
        dark: "#4A2495",
        contrastText: "#f3eefc",
      },
      error: {
        main: "#FF1744",
        light: "#B2102F",
        dark: "#FF1744",
        contrastText: "#f3eefc",
      },
      header: "#b488f4",

      navigation: {
        main: "#525f7f",
        hover: "#525f7f",
        accent: "#d548c1",
      },

      divider: "#efeefd",
      input: "transparent",
      inputBorder: "1 px solid #d7dbda",
      background: {
        default: "#efeefd",
        paper: "#fff",
        image: "#efeefd",
        hover: "transparent",
        dark: "#f6f9fc",
      },
    },
  },

  sea: {
    name: "sea",
    mode: "light",
    values: {
      primary: {
        light: "#525f7f",
        main: "#00c2f2",
        dark: "#00989A",
        contrastText: "#fff",
      },
      // primary: {
      //   light: "#33E1E3",
      //   main: "#00c2f2",
      //   dark: "#00989A",
      //   contrastText: "#fff"
      // },
      // secondary: {
      //   light: "#33E1E3",
      //   main: "#09e185",
      //   dark: "#00989A",
      //   contrastText: "#fff"
      // },
      secondary: {
        light: "#33E1E3",
        main: "#21DEDE",
        dark: "#00989A",
        contrastText: "#fff",
      },

      icons: { primary: "#525f7f", secondary: "#21DEDE" },
      misc: ["#cafbf1", "#b3f6d7", "#aceeb2", "#b5e387", "#c8d45a"],

      success: {
        main: "#21DEDE",
        light: "#4DE4E4",
        dark: "#00DADC",
        contrastText: "#E1F5FE",
      },

      info: {
        light: "#347293",
        main: "#024F79",
        dark: "#013754",
        contrastText: "#f3eefc",
      },
      error: {
        main: "#AF296F",
        light: "#BF538B",
        dark: "#7A1C4D",
        contrastText: "#f3eefc",
      },
      warning: {
        main: "#E7A800",
        light: "#EBB933",
        dark: "#A17500",
        contrastText: "#f3eefc",
      },

      header: "#00c9e2",

      navigation: {
        main: "#525f7f",
        hover: "#525f7f",
        accent: "#00c9e2",
      },

      text: {
        primary: "#1b1f22",
        secondary: "#1b1f22",
      },
      divider: "#efeefd",
      input: "transparent",
      inputBorder: "1 px solid #e9ecef",

      background: {
        // default: "#d6faff",
        default: "#eaf5ff",
        paper: "#fff",
        image: "#eaf5ff",
        dark: "#f6f9fc",
        hover: "transparent",
        // dark: "#ebffff",
        // dark: "#ebffff"
      },
    },
  },

  "sea dark": {
    name: "sea dark",
    mode: "dark",
    values: {
      primary: {
        light: "#347293",
        main: "#024F79",
        dark: "#013754",
        contrastText: "#E1F5FE",
      },
      secondary: {
        main: "#21DEDE",
        light: "#4DE4E4",
        dark: "#00DADC",
        contrastText: "#E1F5FE",
      },

      misc: ["#03a9f4", "#00c4f4", "#00dadc", "#30ebb4", "#a3f58a"],

      icons: { primary: "#347293", secondary: "#00DADC" },
      success: {
        main: "#21DEDE",
        light: "#4DE4E4",
        dark: "#00DADC",
        contrastText: "#E1F5FE",
      },

      info: {
        light: "#347293",
        main: "#024F79",
        dark: "#013754",
        contrastText: "#f3eefc",
      },
      error: {
        main: "#AF296F",
        light: "#BF538B",
        dark: "#7A1C4D",
        contrastText: "#f3eefc",
      },
      warning: {
        main: "#E7A800",
        light: "#EBB933",
        dark: "#A17500",
        contrastText: "#f3eefc",
      },

      navigation: {
        main: "#347293",
        hover: "#21DEDE",
        accent: "#21DEDE",
      },

      text: {
        secondary: "#c3e9fe",
      },
      input: "rgba(0,0,0,0.09)",
      inputBorder: "1px solid #024F79",

      highlight: "rgba(0,0,0,0.1)",
      divider: "rgba(255, 255, 255, 0.12)",

      background: {
        default: "#011a28",
        image: "#013754",
        paper: "#01283d",

        dark: "rgba(0,0,0,0.09)",
      },
    },
  },

  "purple dark": {
    name: "purple dark",
    mode: "dark",
    values: {
      primary: {
        light: "#875CDD",
        main: "#6a34d5",
        dark: "#4A2495",
        contrastText: "#f3eefc",
      },
      divider: "#381877",
      highlight: "#875CDD",

      secondary: {
        main: "#C720E0",
        light: "#D24CE6",
        dark: "#9A2AAD",
        contrastText: "#f3eefc",
      },
      icons: { primary: "#875CDD", secondary: "#C720E0" },
      misc: ["#ca00b2", "#ff365a", "#fd0086", "#ff7431", "#ffa600"],

      appbar: "#ca2e9f",

      text: {
        primary: "#f3eefc",
        secondary: "#cdbbf2",
      },
      success: {
        main: "#A7B32A",
        light: "#B8C254",
        dark: "#747D1D",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      warning: {
        main: "#B6A32B",
        light: "#C4B555",
        dark: "#7F721E",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },

      info: {
        light: "#875CDD",
        main: "#6a34d5",
        dark: "#4A2495",
        contrastText: "#f3eefc",
      },
      error: {
        main: "#FF1744",
        light: "#B2102F",
        dark: "#FF1744",
        contrastText: "#f3eefc",
      },

      navigation: {
        main: "#875CDD",
        hover: "#C720E0",
        accent: "#C720E0",
      },

      divider: "rgba(255, 255, 255, 0.12)",
      input: "rgba(0,0,0,0.09)",
      inputBorder: "1px solid #6a34d5",
      background: {
        default: "#180a33",
        paper: "#301566",
        image: "rgba(0,0,0,0.09)",
        dark: "rgba(0,0,0,0.09)",
      },
    },
  },

  "amber dark": {
    name: "amber dark",
    mode: "dark",
    values: {
      primary: {
        main: "#feb542",
        light: "#FEC367",
        dark: "#B17E2E",

        contrastText: "#1c180d",
      },
      highlight: "#8c6317",
      secondary: {
        main: "#8c6317",
        light: "#A38245",
        dark: "#624510",
        contrastText: "#fff",
      },
      navigation: {
        main: "#FEC367",
        hover: "#8c6317",
        accent: "#8c6317",
      },
      icons: { primary: "#FEC367", secondary: "#A38245" },
      misc: ["#ed7615", "#fcaf14", "#facb4b", "#feb542", "#A17500"],

      error: {
        main: "#ba4528",
      },
      info: {
        main: "#feb542",
      },
      success: {
        main: "#feb542",
      },
      warning: {
        main: "#8c6317",
      },

      appbar: "#006b80",
      header: "transparent",
      text: {
        primary: "#fec725",
        secondary: "#8c6317",
      },
      action: {
        active: "#14f074",
        hover: "#3767",
        selected: "#365",
        focus: "#642",
      },
      divider: "rgba(255, 255, 255, 0.12)",
      inputBorder: "1px solid #8c6317",

      background: {
        image: "#624510",
        default: "#0e0c06",
        paper: "rgba(45, 38, 20)",
        dark: "rgba(0,0,0,0.1)",
        hover: "rgba(0,0,0,0.1)",
      },
    },
  },
};

const defaultTheme = themes.nordic;

module.exports = {
  themes,
  defaultTheme,
};
