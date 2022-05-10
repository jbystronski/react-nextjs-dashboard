import { LineChartButton, BarChartButton } from "../";

const Buttons = ({ handleSetType }) => {
  return (
    <>
      <LineChartButton handleClick={() => handleSetType("line")} />
      <BarChartButton handleClick={() => handleSetType("bar")} />
    </>
  );
};

export default Buttons;
