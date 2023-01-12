import { useState } from "react";
import { TextField, Stack } from "@mui/material";
import { RefreshButton } from "./RefreshButton";

import MuiSelect from "core/ui/MuiSelect";

import {
  getYearFirstDay,
  getToday,
  calculateDaysBetween,
} from "core/utils/dateHelpers";

import { useNotification } from "core/hooks";

export default function TimeRange({ refresh }) {
  const [timeUnit, setTimeUnit] = useState("day");
  const [from, setFrom] = useState("2022-01-01");
  const [to, setTo] = useState(getToday);
  const allowedDaysDifference = 365;

  const notification = useNotification();

  const handleSetTo = (e) => {
    if (checkDaysLimit(e.target.value, from)) {
      setTo(e.target.value);
    }
  };

  const handleSetFrom = (e) => {
    if (checkDaysLimit(to, e.target.value)) {
      setFrom(e.target.value);
    }
  };

  const checkDaysLimit = (dateOne, dateTwo) => {
    if (calculateDaysBetween(dateOne, dateTwo) > allowedDaysDifference) {
      notification.set("Time range exceeded", "error");
      notification.show();

      return false;
    }
    return true;
  };

  const handleSetTime = (e) => {
    console.log(e);
    return;

    setTimeUnit(e.target.value);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 2 }}>
        <TextField
          type="date"
          size="small"
          value={from}
          onChange={handleSetFrom}
        />
        <TextField type="date" size="small" value={to} onChange={handleSetTo} />
        <MuiSelect
          size="small"
          label="Set time unit"
          selected={timeUnit}
          options={["hour", "day", "month", "year"]}
          handleChange={setTimeUnit}
        />
        <RefreshButton handleClick={() => refresh(from, to, timeUnit)} />
      </Stack>
      {notification.component}
    </>
  );
}
