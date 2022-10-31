import { React, useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider } from "core/ui/_libs";
import { FullScreenLoader } from "core/ui";
import CssBaseline from "@mui/material/CssBaseline";
import mountTheme from "./theme";
const { themes, defaultTheme } = require("../../utils/themes");
const ThemeContext = createContext({});
const AppThemeProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState(null);
  const [palette, setPalette] = useState(null);
  const [mode, setMode] = useState(null);

  const changeTheme = (newTheme) => {
    if (currentTheme !== newTheme) setThemeProps(themes[newTheme]);
  };

  const updateTheme = async () => {
    try {
      await fetch("/api/db/update/settings", {
        method: "PUT",
        body: JSON.stringify({
          name: "theme",
          _set: {
            value: currentTheme,
          },
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const setThemeProps = (activeTheme) => {
    const themeProps = activeTheme || defaultTheme;

    setCurrentTheme(themeProps.name);
    setMode(themeProps.mode);
    setPalette(themeProps.values);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `/api/db/find_one/settings?name=theme&_only=value`
        );

        const savedTheme = await res.json();
        console.log("res", savedTheme);
        setThemeProps(themes[savedTheme.value]);
      } catch (e) {
        console.log(e);
      }
    }
    console.log("themes", themes);
    if (!themes) return;

    fetchData();
  }, [themes]);

  const values = {
    currentTheme,
    availableThemes: Object.keys(themes).map((t) => {
      return {
        name: themes[t].name,
        mode: themes[t].mode,
      };
    }),
    changeTheme,
    updateTheme,
  };

  return (
    <>
      {palette && mode && (
        <ThemeProvider theme={mountTheme({ ...palette, mode: mode })}>
          <ThemeContext.Provider value={values}>
            <CssBaseline>
              {!currentTheme ? <FullScreenLoader /> : props.children}
            </CssBaseline>
          </ThemeContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default AppThemeProvider;
