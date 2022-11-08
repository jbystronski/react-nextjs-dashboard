import { useRouter } from "next/router";
import { getLayout } from "components/admin/layout/Layout";
import { AdminTable } from "components/admin/tables";

export default function Table() {
  const router = useRouter();
  const { model } = router.query;

  return router.isReady && <AdminTable key={model} model={model} />;
}

Table.getLayout = getLayout;
