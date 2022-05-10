import { useState } from "react";
import { addProps } from "core/utils/addProps";
import { TimeRange, SectionHeader, Buttons } from ".";

import dynamic from "next/dynamic";
const BarChart = dynamic(() => import("core/ui/charts/BarChart"));
const LineChart = dynamic(() => import("core/ui/charts/LineChart"));
import { Divider, Box } from "core/ui/_libs";

export const Chart = ({
  type,
  data,
  refresh,
  headerIcon,
  headerText,
  headerBg
}) => {
  const [chartType, setChartType] = useState(type);

  const charts = {
    bar: <BarChart />,
    line: <LineChart />
  };

  const handleRefresh = (from, to, time) => {
    refresh(from, to, time);
  };

  const getData = (canvas) => {
    // const ctx = canvas.getContext("2d");
    // const gradient = ctx.createLinearGradient(0, 0, 100, 0);

    return {
      labels: data.labels,
      datasets: data.datasets
    };
  };

  return (
    <>
      <SectionHeader icon={headerIcon} text={headerText} bg={headerBg}>
        <Buttons handleSetType={setChartType} />
      </SectionHeader>
      <Box
        sx={{
          p: {
            xs: 1,
            sm: 5
          },
          pb: 3
        }}
      >
        {addProps(charts[chartType], {
          data: getData()
        })}
      </Box>

      <Box sx={{ p: 2, pt: 0, background: "background.dark" }}>
        <TimeRange refresh={handleRefresh} />
      </Box>
    </>
  );
};
