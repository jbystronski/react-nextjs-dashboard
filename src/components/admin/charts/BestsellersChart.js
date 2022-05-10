import { useTheme } from "@mui/styles";
import dynamic from "next/dynamic";
const Doughnat = dynamic(() => import("core/ui/charts/DoughnatChart"));

export default function BestsellersChart({ data, limit }) {
  const {
    palette: { misc: colors }
  } = useTheme();

  function getTopSellingProducts(data, limit) {
    return {
      labels: data
        .map((el) => el["name"])
        .filter((el, index) => index <= limit),
      datasets: [
        {
          label: "Top selling products",
          data: data
            .map((el) => el["sold"])
            .filter((el, index) => index <= limit),
          backgroundColor: colors,

          borderWidth: 0
        }
      ]
    };
  }

  return <Doughnat data={getTopSellingProducts(data, limit)} />;
}
