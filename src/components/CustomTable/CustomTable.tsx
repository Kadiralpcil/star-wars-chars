import { useMemo, useState } from "react";

import "./customTable.scss";

//Components
import Card from "../Card";
import Loader from "../Loader";

//Icons
import { FaArrowDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Column<T> {
  header: string;
  key: keyof T;
}

interface CustomTableProps<T extends { id: string; name?: string | null }> {
  columns: Column<T>[];
  data?: T[];
  onLoading?: boolean;
}

export const CustomTable = <T extends { id: string; name?: string | null }>({
  columns,
  data = [],
  onLoading,
}: CustomTableProps<T>) => {
  // States
  const [itemPerPage, setItemPerPage] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSearchValue, setCurrentSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Hooks
  const navigate = useNavigate();

  //Memoization
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name?.toLowerCase().includes(currentSearchValue.toLowerCase())
    );
  }, [currentSearchValue, data]);
  const pages = useMemo(
    () => Math.ceil(filteredData.length / itemPerPage),
    [filteredData, itemPerPage]
  );
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    return filteredData.slice(startIndex, startIndex + itemPerPage);
  }, [filteredData, currentPage, itemPerPage]);

  //Handlers
  const handleItemClick = (value: number) => {
    setCurrentPage(1);
    setItemPerPage(value);
    setIsDropdownOpen(false);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const renderPages = () => {
    const pageNumbers: JSX.Element[] = [];

    if (currentPage <= 4) {
      for (let i = 1; i <= Math.min(4, pages); i++) {
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
    } else if (currentPage >= pages - 2) {
      for (let i = Math.max(1, pages - 3); i <= pages; i++) {
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

  if (onLoading) return <Loader />;
  return (
    <Card className="custom-table">
      <div className="custom-table-content">
        <div className="custom-table-actions">
          <div className="custom-table-actions-search">
            <IoSearch />
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => {
                setCurrentSearchValue(e.target.value);
                setCurrentPage(1);
              }}
              value={currentSearchValue}
            />
          </div>
          <FaArrowDown />
        </div>
        <div className="custom-table-row-select">
          <div>Rows per page: {itemPerPage}</div>
          <div className="dropdown-wrapper">
            <div
              className="dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MdOutlineKeyboardArrowDown />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {[5, 10, 15, 20].map((value) => (
                  <div
                    key={value}
                    className={`dropdown-item ${itemPerPage === value && ""}`}
                    onClick={() => handleItemClick(value)}
                  >
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="custom-table-header">
          {columns.map((col) => (
            <div key={col.key as string} className="custom-table-cell">
              {col.header}
            </div>
          ))}
        </div>
        <div className="custom-table-body">
          {paginatedData.map((row) => (
            <div
              onClick={() => navigate(`/detail?id=${row.id}`)}
              key={row.id}
              className="custom-table-body-row"
            >
              {columns.map((col) => (
                <div key={col.key as string} className="custom-table-cell">
                  {String(row[col.key])}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="custom-table-footer">
        <div className="custom-table-footer-pages">
          <MdKeyboardArrowLeft
            className="custom-table-footer-pages-icon"
            size={24}
            onClick={() =>
              currentPage !== 1 && handlePageChange(currentPage - 1)
            }
          />
          <div className="custom-table-footer-pages-number-wrapper">
            {renderPages()}
          </div>
          <MdKeyboardArrowRight
            className="custom-table-footer-pages-icon"
            size={24}
            onClick={() =>
              currentPage !== pages && handlePageChange(currentPage + 1)
            }
          />
        </div>
      </div>
    </Card>
  );
};
