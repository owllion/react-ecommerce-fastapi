import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "src/styles/pagination.css";
import { useAppSelector } from "../../store/hooks";
interface IProps {
  itemsPerPage: number;
  itemsLength: number;
  handlePageClick: (event: { selected: number }) => void;
}
const Pagination = ({ itemsPerPage, itemsLength, handlePageClick }: IProps) => {
  const [pageCount, setPageCount] = useState(0);
  const { totalNum } = useAppSelector((state) => state.product);

  useEffect(() => {
    console.log(pageCount, "pageCount啥的");
    setPageCount(Math.ceil(totalNum / itemsPerPage));
  }, [totalNum]);

  return (
    <>
      <ReactPaginate
        onPageChange={(num) => handlePageClick(num)}
        nextLabel=">"
        previousLabel="<"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="prev"
        nextClassName="page-item"
        nextLinkClassName="next"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null as any}
      />
    </>
  );
};

export default Pagination;
