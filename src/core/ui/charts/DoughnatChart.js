import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnatChart = ({ data }) => {
  return (
    <Doughnut
      style={{ maxHeight: "240px", maxWidth: "240px" }}
      data={data}
      options={{
        plugins: {
          legend: {
            title: {
              display: false
            },
            display: false,
            position: "bottom",
            labels: {
              usePointStyle: true,
              textAlign: "left"
            }
          }
        },
        aspectRatio: 1
        // responsive: true
        // maintainAspectRatio: true
      }}
    />
  );
};

export default DoughnatChart;
