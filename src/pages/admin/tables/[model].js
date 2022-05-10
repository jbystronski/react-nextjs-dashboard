import { useRouter } from "next/router";
import { getLayout, tables } from "components";

export default function Table() {
  const router = useRouter();
  const { model } = router.query;
  const { AdminTable } = tables;

  return router.isReady && <AdminTable key={model} model={model} />;
}

Table.getLayout = getLayout;
