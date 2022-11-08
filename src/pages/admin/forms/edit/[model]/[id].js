import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { getLayout } from "components/admin/layout/Layout";
import dynamic from "next/dynamic";
const EditForm = dynamic(() => import("components/admin/forms/EditForm"));

export default function EditFormPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const { model, id } = router.query;

  useEffect(() => {
    if (router.isReady) {
      setReady(router.isReady);
    }
  }, [router.isReady]);

  return ready && <EditForm key={id} model={model} id={id} />;
}

EditFormPage.getLayout = getLayout;
