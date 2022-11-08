import { useRouter } from "next/router";

import { getLayout } from "components/admin/layout/Layout";

import dynamic from "next/dynamic";
const CreateForm = dynamic(() => import("components/admin/forms/CreateForm"));

export default function CreateFormPage() {
  const router = useRouter();
  const { model } = router.query;

  return router.isReady && <CreateForm model={model} />;
}

CreateFormPage.getLayout = getLayout;
