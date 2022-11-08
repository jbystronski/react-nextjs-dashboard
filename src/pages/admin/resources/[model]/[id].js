import { useRouter } from "next/router";
import { getLayout } from "components/admin/layout/Layout";
import { addProps } from "core/utils/addProps";
import { default as Order } from "components/admin/resources/order/Index";
import { default as User } from "components/admin/resources/user/Index";

export default function ResourcePage() {
  const router = useRouter();
  const { id, model } = router.query;

  const components = {
    users: <User />,
    orders: <Order />,
  };

  return router.isReady && addProps(components[model], { id: id });
}
ResourcePage.getLayout = getLayout;
