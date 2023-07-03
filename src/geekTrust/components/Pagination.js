import React from "react";
import { DOTS, usePaginationRange } from "./UsePagination";
import "./Pagination.css";

function Pagination({
  totalPageCount,
  range,
  siblingCount,
  buttonConst,
  currentPage,
  navigationButtons,
}) {
  const paginationRange = usePaginationRange({
    totalPageCount,
    range,
    buttonConst,
    siblingCount,
    currentPage,
  });

  return (
    <section className="pagination">
       <button
        id="first"
        onClick={navigationButtons}
        className={`first ${((currentPage === 1 )||totalPageCount===0)? "disabled" : ""}`}
      >
        first
      </button>
      <button
        id="prev"
        onClick={navigationButtons}
        className={` prev ${(currentPage === 1 || totalPageCount===0) ? "disabled" : ""}`}
      >
        previous
      </button>
      {paginationRange.map((item, index) => {
        if (item === DOTS) {
          return <span>...</span>;
        }
        return (
          <button
            key={index}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
            id="ball"
            onClick={(e)=>{navigationButtons(e,item)}}
          >
            {item}
          </button>
        );
      })}
      <button
        id="next"
        onClick={navigationButtons}
        className={`next ${((currentPage === totalPageCount) || totalPageCount===0) ? "disabled" : ""}`}
      >
        next
      </button>
      <button
        id="last"
        onClick={navigationButtons}
        className={`last ${((currentPage === totalPageCount) || totalPageCount===0) ? "disabled" : ""}`}
      >
        last
      </button>

    </section>
  );
}

export default Pagination;
