import { charts, getLayout } from "components";

export default function ChartsPage() {
  const { ChartsLayout } = charts;

  return <ChartsLayout />;
}
ChartsPage.getLayout = getLayout;
