import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const { body, init, immediate = true } = options;

  const [data, setData] = useState(init);
  const [error, setError] = useState(null);

  async function fetchData(url, options) {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      console.log("resp", json);
      setData(json);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  }

  useEffect(() => {
    if (immediate) {
      fetchData(url, body);
    }
  }, [url, immediate, JSON.stringify(body)]);

  return { data, error, fetchData, setData };
};

export default useFetch;
