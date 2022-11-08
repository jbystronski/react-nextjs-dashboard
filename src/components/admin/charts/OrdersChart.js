import { useState } from "react";
import { Chart } from "./Chart";
import { useFetch } from "core/hooks";
import { Paper } from "@mui/material";
import {
  getYearFirstDay,
  getToday,
  setTimeRange,
} from "core/utils/dateHelpers";
import { useTheme } from "@mui/styles";

export const OrdersChart = () => {
  const {
    palette: { misc: colors },
  } = useTheme();

  const [timeUnit, setTimeUnit] = useState("day");
  const [from, setFrom] = useState(getYearFirstDay);
  const [to, setTo] = useState(getToday);

  const { data, error } = useFetch(
    `/api/db/find/orders?created_at._gte=${from}&created_at._lte=${to}&_sort.created_at=1&_only=created_at,total_to_pay`,
    { init: [] }
  );

  const changeTimeRange = (from, to, timeUnit) => {
    setTimeUnit(timeUnit);
    setFrom(from);
    setTo(to);
  };

  const getChartData = (data, timeProp, timeRange) => {
    const chartData = {};

    data.forEach((el) => {
      const key = setTimeRange(el[timeProp], timeRange);

      if (!chartData.hasOwnProperty(key)) {
        chartData[key] = {
          count: 1,
          total: el["total_to_pay"],
        };
      } else {
        chartData[key]["count"]++;
        chartData[key]["total"] += el["total_to_pay"];
      }
    });

    return {
      labels: Object.keys(chartData),
      datasets: [
        {
          backgroundColor: colors && colors[3],
          borderColor: colors && colors[3],
          color: "white",
          strokeColor: "rgba(220,220,220,0.8)",
          fillColor: "rgba(220,220,220,0.5)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: Object.values(chartData).map((el) => el["total"]),
        },
      ],
    };
  };

  return (
    <>
      {data ? (
        <Paper style={{ overflow: "hidden" }}>
          <Chart
            type="bar"
            data={getChartData(data, "created_at", timeUnit)}
            refresh={changeTimeRange}
            chartValue="created_at"
            headerText="Sales timeline"
            headerBg={colors && colors[1]}
          />
        </Paper>
      ) : null}
    </>
  );
};
