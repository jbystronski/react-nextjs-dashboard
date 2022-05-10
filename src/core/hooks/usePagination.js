import { useState, useEffect } from "react";

function usePagination({ url, limit, countUrl }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [dependecies, setDependencies] = useState("{}");

  const [lastPage, setLastPage] = useState(0);

  const [resetCount, setResetCount] = useState(true);

  const [count, setCount] = useState(0);

  const skipRecords = (page, limit, count) => {
    if (page === 1) return 0;
    return page * limit - limit;
  };

  async function fetchCount() {
    try {
      const res = await fetch(countUrl);
      const json = await res.json();
      setCount(json);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchData() {
    try {
      url += `&_skip=${skipRecords(page, limit, count)}`;
      url += `&_limit=${limit}`;

      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (limit * page + (count % lastPage) - limit > count) {
      setPage(1);
    }

    if (resetCount) {
      fetchCount();

      setResetCount(false);
      return;
    }
    if (!count) return;
    const last = count % limit === 0 ? count / limit : Math.ceil(count / limit);
    if (last !== lastPage) setLastPage(last);

    const stringified = JSON.stringify([url, page, limit, count, resetCount]);

    if (dependecies !== stringified) {
      setDependencies(stringified);
      fetchData(url);
    }
  }, [JSON.stringify([url, page, limit, count, resetCount])]);

  const getPrev = () => {
    page > 1 ? setPage(page - 1) : false;
  };

  const getNext = () => {
    page < lastPage ? setPage(page + 1) : false;
  };

  const getRecords = () => {
    // page 1 count 2
    // page 3 count 17

    if (lastPage === 1) return [1, count];
    if (page === 1) return [1, limit];
    if (page === lastPage) return [page * limit + 1 - limit, count];
    return [page * limit + 1 - limit, page * limit];
  };

  //FIXME: fix incorrectly displayed record numbers
  return {
    getRecords,
    page,
    data,
    first: () => setPage(1),
    getLastPage: () => setPage(lastPage),
    prev: getPrev,
    next: getNext,
    lastPage,
    resetCount: () => {
      setPage(1);
      setResetCount(true);
    },
    count,
    filter: (ids) => {
      const cp = data.filter((entry) => !ids.includes(entry._id));
      setData(cp);
    }
  };
}

export default usePagination;
