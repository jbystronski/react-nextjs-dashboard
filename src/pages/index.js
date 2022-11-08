import { getLayout } from "components/admin/layout/Layout";
import ChartsLayout from "components/admin/charts/ChartsLayout";

export default function ChartsPage() {
  return <ChartsLayout />;
}
ChartsPage.getLayout = getLayout;
