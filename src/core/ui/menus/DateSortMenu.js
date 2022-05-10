import { useState } from "react";

import { getYearFirstDay, getToday } from "core/utils/dateHelpers";

import {
  Fade,
  Popper,
  Box,
  IconButton,
  Stack,
  TextField,
  Text
} from "core/ui/_libs";
import { UiButton, IconMapper } from "core/ui";
import { useTheme } from "core/ui/_libs";

export default function DateSortMenu({ handleSort }) {
  const [from, setFrom] = useState(getYearFirstDay);
  const [to, setTo] = useState(getToday);
  const [open, setOpen] = useState(false);

  const {
    palette: { mode }
  } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const onHandleSort = () => {
    handleSort({
      from: from,
      to: to
    });
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <IconMapper icon="time" color="icons.primary" />
      </IconButton>
      <Popper open={open} anchorEl={anchorEl} transition keepMounted>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Stack
              direction="column"
              sx={{
                p: 1,
                px: 2,
                pt: 2,
                borderRadius: "8px",
                bgcolor: "background.paper",
                minWidth: "200px",
                borderColor: mode === "dark" ? "primary.main" : "#e9ecef",
                borderWidth: 1,
                minWidth: "350px",
                borderStyle: "solid"
              }}
            >
              <Text sx={{ mb: 2 }}>Filter by dates</Text>
              <TextField
                sx={{ mb: 1 }}
                type="date"
                size="small"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <TextField
                type="date"
                size="small"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />

              <Box
                sx={{ display: "flex", justifyContent: "center", p: 2, pb: 1 }}
              >
                <UiButton label="Sort" onClick={onHandleSort} />
              </Box>
            </Stack>
          </Fade>
        )}
      </Popper>
    </>
  );
}
