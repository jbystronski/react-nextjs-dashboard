import { useState } from "react";
import { Chart } from ".";
import {
  getYearFirstDay,
  getToday,
  setTimeRange
} from "core/utils/dateHelpers";
import { Paper } from "core/ui/_libs";

import { useTheme } from "@mui/styles";

import { useFetch } from "core/hooks";

export const UsersChart = () => {
  const {
    palette: { misc: colors }
  } = useTheme();

  const [timeUnit, setTimeUnit] = useState("day");
  const [from, setFrom] = useState(getYearFirstDay);
  const [to, setTo] = useState(getToday);

  const changeTimeRange = (from, to, timeUnit) => {
    setTimeUnit(timeUnit);
    setFrom(from);
    setTo(to);
  };

  const { data, error } = useFetch(
    `/api/db/find/users?created_at._gte=${from}&created_at._lte=${to}&_sort.created_at=-1&_only=created_at,logged_in`,

    { init: [] }
  );

  const getChartData = (data, timeProp, timeRange) => {
    const chartData = {};

    data.forEach((el) => {
      const key = setTimeRange(el[timeProp], timeRange);
      !chartData.hasOwnProperty(key) ? (chartData[key] = 1) : chartData[key]++;
    });

    return {
      labels: Object.keys(chartData),
      datasets: [
        {
          backgroundColor: colors && colors[2],
          borderColor: colors && colors[2],
          data: Object.values(chartData)
        }
      ]
    };
  };

  return (
    <>
      <Paper style={{ overflow: "auto" }}>
        <Chart
          type="bar"
          data={getChartData(data, "created_at", timeUnit)}
          refresh={changeTimeRange}
          chartValue="created_at"
          headerText="Registrations timeline"
          headerBg={colors && colors[1]}
        />
      </Paper>
    </>
  );
};
