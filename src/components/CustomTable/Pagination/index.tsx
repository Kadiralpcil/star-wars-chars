import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, pages, onPageChange }: PaginationProps) => {
  return (
    <div className="custom-table-footer">
      <div>
        {currentPage} of {pages}{" "}
      </div>
      <div
        onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        className="custom-table-footer-button"
      >
        <MdKeyboardArrowLeft size={24} />
        <div>Prev</div>
      </div>
      <div
        onClick={() => currentPage !== pages && onPageChange(currentPage + 1)}
        className="custom-table-footer-button"
      >
        <div>Next</div>
        <MdKeyboardArrowRight size={24} />
      </div>
    </div>
  );
};

export default Pagination;
