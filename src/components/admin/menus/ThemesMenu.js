import * as React from "react";
import { useNotification } from "core/hooks";
import { useTheme } from "lib/contexts";
import { SwitchList, UiButton, IconMapper } from "core/ui";
import {
  Box,
  Fade,
  Popper,
  IconButton,
  useTheme as useMuiTheme
} from "core/ui/_libs";

export default function ThemesMenu() {
  const { availableThemes, currentTheme, changeTheme, updateTheme } =
    useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    palette: { mode }
  } = useMuiTheme();

  const alert = useNotification();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const onThemeChange = async () => {
    const res = await updateTheme();
    alert.set("Theme set", "success");
    alert.show();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: {
            xs: "#fff",
            sm: "#fff",
            md: mode === "light" ? "icons.primary" : "#fff"
          }
        }}
      >
        <IconMapper icon="palette" />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 200 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                p: 1,
                borderRadius: "8px",
                bgcolor: "background.paper",
                minWidth: "300px",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "divider"
              }}
            >
              <SwitchList
                list={availableThemes.filter((t) => t.mode === "light")}
                subheader="Light themes"
                onChangeHandler={changeTheme}
                label="name"
                isChecked={(v) => v["name"] === currentTheme}
                listProps={{
                  dense: true
                }}
                labelProps={{
                  variant: "body1"
                }}
              />
              <SwitchList
                list={availableThemes.filter((t) => t.mode === "dark")}
                subheader="Dark themes"
                onChangeHandler={changeTheme}
                label="name"
                isChecked={(v) => v["name"] === currentTheme}
                listProps={{
                  dense: true
                }}
                labelProps={{
                  marginRight: "16px",
                  variant: "body1"
                }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "center", p: 2, pb: 1 }}
              >
                <UiButton label="Save theme" onClick={onThemeChange} />
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
      {alert.component}
    </>
  );
}
