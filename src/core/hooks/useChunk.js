import { useState, useEffect } from "react";

function useChunk(url, limit = 5, fetchOver = 2) {
  const [data, setData] = useState([]);
  const [nextChunk, setNextChunk] = useState(true);
  const [offset, setOffset] = useState([0, limit]);
  const [error, setError] = useState(null);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    async function fetchData() {
      url += `${url.split("").indexOf("?") === -1 ? "?" : "&"}_skip=${
        data.length
      }&_limit=${limit * fetchOver}`;

      try {
        const res = await fetch(url);

        const json = await res.json();
        if (json.length) {
          setData([...data, ...json]);
          setNextChunk(false);
        }
      } catch (e) {
        setError(e);
      }
    }

    if (nextChunk) {
      fetchData();
    }
  }, [nextChunk]);

  const isLastChunk = () => data.length === offset[1] + limit;

  return {
    chunk: data.slice(offset[0], offset[1]),
    error,
    updateChunk: function (newData, subIndex) {
      const cp = data.slice();
      data[offset[0] + subIndex] = newData;
      setData(cp);
    },
    next: function () {
      if (isLastChunk()) {
        setNextChunk(true);
      }
      if (!data.slice(offset[0] + limit, offset[1] + limit).length) {
        return false;
      }

      setOffset([offset[0] + limit, offset[1] + limit]);
    },
    prev: () =>
      offset[0] === 0
        ? false
        : setOffset([offset[0] - limit, offset[1] - limit])
  };
}
export default useChunk;
