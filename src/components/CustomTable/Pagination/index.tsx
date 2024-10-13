import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  handlePageChange: (value: number) => void;
}

const Pagination = ({
  currentPage,
  totalCount,
  handlePageChange,
}: PaginationProps) => {
  const renderPages = () => {
    const pageNumbers: JSX.Element[] = [];
    if (currentPage <= 4) {
      for (let i = 1; i <= Math.min(4, totalCount); i++) {
        pageNumbers.push(
          <div
            key={i}
            className={`custom-table-footer-pages-number ${
              currentPage === i ? "active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </div>
        );
      }
    } else if (currentPage >= totalCount - 2) {
      for (let i = Math.max(1, totalCount - 3); i <= totalCount; i++) {
        pageNumbers.push(
          <div
            key={i}
            className={`custom-table-footer-pages-number ${
              currentPage === i ? "active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </div>
        );
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pageNumbers.push(
          <div
            key={i}
            className={`custom-table-footer-pages-number ${
              currentPage === i ? "active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </div>
        );
      }
    }
    return <>{pageNumbers}</>;
  };
  return (
    <div className="custom-table-footer">
      <div className="custom-table-footer-pages">
        <MdKeyboardArrowLeft
          className="custom-table-footer-pages-icon"
          size={24}
          onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)}
        />
        <div className="custom-table-footer-pages-number-wrapper">
          {renderPages()}
        </div>
        <MdKeyboardArrowRight
          className="custom-table-footer-pages-icon"
          size={24}
          onClick={() =>
            currentPage !== totalCount && handlePageChange(currentPage + 1)
          }
        />
      </div>
    </div>
  );
};

export default Pagination;
