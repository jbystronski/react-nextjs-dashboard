import * as React from "react";

import {
  Fade,
  Popper,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Text,
  Stack
} from "core/ui/_libs";
import { UiButton, IconMapper } from "core/ui";
import { useTheme } from "core/ui/_libs";

const SortOptions = ({ keyProp, getSort, initial }) => {
  const [sort, setSort] = React.useState(initial);

  const handleSetSort = (v) => {
    setSort(v);

    getSort(keyProp, v);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={2}
      alignItems="center"
      sx={{ p: 1, cursor: "pointer" }}
    >
      <IconMapper
        icon="down"
        onClick={() => handleSetSort(-1)}
        color={sort === -1 ? "secondary.main" : "disabled"}
      />
      <IconMapper
        icon="up"
        onClick={() => handleSetSort(1)}
        color={sort === 1 ? "secondary.main" : "disabled"}
      />
      <IconMapper
        icon="x"
        onClick={() => handleSetSort(0)}
        color={sort === 0 ? "secondary.main" : "disabled"}
      />
    </Stack>
  );
};

export default function TableSortMenu({
  options,
  handleSort,
  keyProp,
  valueProp,
  initialProp
}) {
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [sortObject, setSortObject] = React.useState({});

  const {
    palette: { mode }
  } = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const onHandleSort = () => {
    const obj = Object.keys(sortObject).reduce(
      (acc, next) =>
        sortObject[next] !== 0
          ? { ...acc, [next]: sortObject[next] }
          : { ...acc },
      {}
    );
    handleSort(obj);
    setOpen(false);
  };

  const getSort = (k, v) => {
    setSortObject({ ...sortObject, [k]: v });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <IconMapper icon="sort" fontSize="small" color="icons.primary" />
      </IconButton>
      <Popper open={open} anchorEl={anchorEl} transition keepMounted>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                p: 1,
                px: 2,
                pt: 2,
                borderRadius: "8px",
                bgcolor: "background.paper",
                minWidth: "200px",
                borderColor: mode === "dark" ? "primary.main" : "#e9ecef",
                borderWidth: 1,
                borderStyle: "solid",
                minWidth: "300px"
              }}
            >
              <List>
                {options.map((option) => (
                  <ListItem key={JSON.stringify(option)} disablePadding>
                    <ListItemText
                      primary={
                        <Text>{valueProp ? option[valueProp] : option}</Text>
                      }
                    />
                    <ListItemSecondaryAction>
                      <SortOptions
                        keyProp={keyProp ? option[keyProp] : option}
                        getSort={getSort}
                        initial={initialProp ? option[initialProp] : option}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{ display: "flex", justifyContent: "center", p: 2, pb: 1 }}
              >
                <UiButton label="Sort" onClick={onHandleSort} />
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
