import { useRouter } from "next/router";

import { resources, getLayout } from "components";
import { addProps } from "core/utils/addProps";

export default function ResourcePage() {
  const router = useRouter();
  const { id, model } = router.query;
  const { Order, User } = resources;

  const components = {
    users: <User />,
    orders: <Order />
  };

  return router.isReady && addProps(components[model], { id: id });
}
ResourcePage.getLayout = getLayout;
