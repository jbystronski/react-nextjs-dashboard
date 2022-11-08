import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Paper,
  List,
  Divider,
  Stack,
} from "@mui/material";
import { createTheme, useTheme } from "@mui/material/styles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { default as MuiDrawer } from "@mui/material/Drawer";
import { useRouter } from "next/router";
import { useAdmin } from "lib/contexts";
import { useWindowSize } from "core/hooks";
import IconMapper from "core/ui/icons/IconMapper";
import Image from "core/ui/images/Image";
import IconButton from "core/ui/IconButton";

const Nav = ({
  addedMenu = [],
  listStyling = { p: 1, my: 2, width: "95%" },
}) => {
  const router = useRouter();
  const { setManagerOpen, managerOpen, setManagerHidden, managerHidden } =
    useAdmin();
  const [submenus, setSubmenu] = React.useState([false]);

  const handleClick = (int) => {
    const copy = submenus.slice();
    copy[int] = !copy[int];
    setSubmenu(copy);
  };

  const menuItems = [
    {
      path: "/admin/charts",
      button: true,
      label: "Analytics",
      icon: <IconMapper icon="dashboard" />,
      onClick: () => router.push("/admin/charts"),
    },
    {
      path: null,
      button: true,
      submenuId: 0,
      label: "Users",
      icon: <IconMapper icon="user" />,
      children: [
        {
          path: "/admin/clollections/users",
          label: "List",
          button: true,
          onClick: () =>
            router.push({
              pathname: "/admin/tables/[model]",
              query: { model: "users" },
            }),
        },
      ],
    },
    {
      path: null,
      button: true,
      submenuId: 2,
      label: "Products",
      icon: <IconMapper icon="product" />,
      children: [
        {
          path: "/admin/clollections/products",
          label: "List",
          button: true,
          onClick: () =>
            router.push({
              pathname: "/admin/tables/[model]",
              query: { model: "products" },
            }),
        },
        {
          path: "/admin/clollections/products",
          button: true,
          label: "Create",
          onClick: () =>
            router.push({
              pathname: "/admin/forms/create/[model]",
              query: { model: "products" },
            }),
        },
      ],
    },
    {
      path: null,
      button: true,
      submenuId: 3,
      label: "Orders",
      icon: <IconMapper icon="order" />,
      children: [
        {
          path: "/admin/clollections/orders",
          button: true,
          label: "List",
          onClick: () =>
            router.push({
              pathname: "/admin/tables/[model]",
              query: { model: "orders" },
            }),
        },
      ],
    },

    {
      path: null,
      button: true,
      label: "Filesystem",
      icon: <IconMapper icon="fs" />,
      onClick: () =>
        managerHidden ? alert("hidden") : setManagerOpen(!managerOpen),
    },
    ...addedMenu,
  ];

  return (
    <List dense sx={listStyling}>
      {menuItems.map((element) =>
        element.children ? (
          <React.Fragment key={element.label}>
            <ListItem button onClick={() => handleClick(element.submenuId)}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText
                primary={element.label}
                primaryTypographyProps={{
                  variant: "body",
                }}
              />
              {submenus[element.submenuId] ? (
                <IconMapper icon="down" />
              ) : (
                <IconMapper icon="paginate_next" />
              )}
            </ListItem>
            <Collapse
              in={submenus[element.submenuId]}
              timeout="auto"
              unmountOnExit
            >
              <List dense={true}>
                {element.children &&
                  element.children.map((child) => {
                    return (
                      <ListItem
                        key={child.label}
                        button
                        onClick={child.onClick}
                      >
                        <ListItemIcon>{child.icon && child.icon}</ListItemIcon>
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            variant: "body",
                          }}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Collapse>
          </React.Fragment>
        ) : (
          <ListItem
            sx={element.styling}
            key={element.label}
            button={element.button}
            onClick={element.onClick}
            secondaryAction={element.secondaryAction || null}
          >
            <ListItemIcon>{element.icon && element.icon}</ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                variant: "body",
              }}
              primary={element.label}
            />
          </ListItem>
        )
      )}
    </List>
  );
};

const CompactMenu = ({ menuWidth }) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const {
    palette: { mode },
  } = useTheme();
  const windowSize = useWindowSize();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const anchor = "left";

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(anchor, true)}
        sx={{
          color: {
            xs: "#fff",
            sm: "#fff",
            md: mode === "light" ? "icons.primary" : "#fff",
          },
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 5001,
          ml: 2,
          mt: 1.5,
        }}
      >
        <IconMapper icon="menu" />
      </IconButton>

      <MuiDrawer
        sx={{ zIndex: 7000 }}
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{ width: windowSize.width / 2 }}
          role="presentation"
          // onClick={toggleDrawer("top", false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <Logo size="tiny" mb={1} mt={1} />
          <Nav listStyling={{ pb: 2, width: "100%" }} />
          <IconButton
            sx={{ position: "absolute", bottom: "16px", right: "16px" }}
            onClick={toggleDrawer(anchor, false)}
          >
            <IconMapper icon="x" />
          </IconButton>
        </Box>
      </MuiDrawer>
    </div>
  );
};

const getTheme = (palette) =>
  createTheme({
    palette: {
      action: {
        hover: palette.background.hover || "rgba(0,0,0,0.05)",
      },
    },
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            borderLeft: "5px solid transparent",
            "& .MuiTypography-root": {
              color: palette.navigation.main,
            },
            "& .MuiSvgIcon-root": {
              color: palette.navigation.main,
            },
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            "&:hover": {
              borderLeft: `5px solid ${palette.navigation.accent}`,

              color: palette.navigation.hover,
              "& .MuiSvgIcon-root": {
                color: palette.navigation.hover,
              },
              "& .MuiTypography-root": {
                color: palette.navigation.hover,
              },
            },
          },
        },
      },
    },
  });

const Logo = ({ size, mb = 3, mt = 3 }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: mb, mt: mt }}>
        <Image
          path={"/images/logo.svg"}
          bg="transparent"
          size={size || "medium"}
        />
      </Box>
      <Divider />
    </>
  );
};

const Drawer = () => {
  const { palette } = useTheme();
  const windowSize = useWindowSize();
  const { managerOpen, setManagerOpen } = useAdmin();

  const { breakpoints } = useTheme();

  return (
    <>
      {windowSize.width > breakpoints.values.md ? (
        <Box
          component={Paper}
          sx={{
            minHeight: {
              xl: "60vh",
              md: "60vh",
              xs: "100px",
            },
          }}
        >
          <>
            <Logo size="medium" />
            {/* <Box
              sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}
            >
              <Image path={"/images/logo.svg"} bg="transparent" size="medium" />
            </Box>
            <Divider /> */}
          </>

          <Stack direction="column" alignItems="center">
            <ThemeProvider theme={getTheme(palette)}>
              <Nav />
            </ThemeProvider>
          </Stack>
        </Box>
      ) : (
        <CompactMenu menuWidth={windowSize.width} />
      )}
    </>
  );
};

export default Drawer;
