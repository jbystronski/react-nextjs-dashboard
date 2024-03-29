import FullScreenLoader from "core/ui/FullScreenLoader";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <FullScreenLoader />
  ) : (
    getLayout(<Component {...pageProps}></Component>)
  );
}

export default MyApp;
