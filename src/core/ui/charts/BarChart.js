import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },

  elements: {
    bar: {
      borderRadius: 50,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BarChart = ({ data }) => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
