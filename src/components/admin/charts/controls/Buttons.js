import LineChartButton from "./LineChartButton";
import BarChartButton from "./BarChartButton";

const Buttons = ({ handleSetType }) => {
  return (
    <>
      <LineChartButton handleClick={() => handleSetType("line")} />
      <BarChartButton handleClick={() => handleSetType("bar")} />
    </>
  );
};

export default Buttons;
