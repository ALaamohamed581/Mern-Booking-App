import { useState } from "react";
import React from "react";
const Pagination = () => {
  const [page, setPage] = useState(1);
  const [pageCout, setPageCount] = useState(0);
  const route = `http://localhost:8000/api/v1/my-hotel-routes/list?page=${page}`;

  const dePage = () => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  };
  const inpage = () => {
    setPage((p) => p + 1);
  };

  return (
    <>
      <footer>
        <button disabled={page === 1} onClick={dePage}>
          Previous
        </button>
        <button disabled={page === pageCout} onClick={inpage}>
          next
        </button>
      </footer>
    </>
  );
};

export default Pagination;
