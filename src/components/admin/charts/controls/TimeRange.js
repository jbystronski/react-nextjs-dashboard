import { useState } from "react";
import { TextField, Stack } from "core/ui/_libs";

import MuiSelect from "core/ui/MuiSelect";

import {
  getYearFirstDay,
  getToday,
  calculateDaysBetween
} from "core/utils/dateHelpers";

import { RefreshButton } from "../";
import { useNotification } from "core/hooks";
import { IconButton } from "core/ui";

export default function TimeRange({ refresh }) {
  const [timeUnit, setTimeUnit] = useState("day");
  const [from, setFrom] = useState(getYearFirstDay);
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
          handleChange={(e) => setTimeUnit(e.target.value)}
        />
        <RefreshButton handleClick={() => refresh(from, to, timeUnit)} />
      </Stack>
      {notification.component}
    </>
  );
}
