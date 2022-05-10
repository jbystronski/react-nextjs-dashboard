import React from "react";
import AppThemeProvider from "./context";

const withTheme = (Component) => {
  const WrappedComponent = (props) => <Component {...props} />;

  return (
    <AppThemeProvider>
      <WrappedComponent {...props} />
    </AppThemeProvider>
  );
};

export default withTheme;
