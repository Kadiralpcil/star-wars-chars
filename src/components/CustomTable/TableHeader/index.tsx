import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface TableHeaderProps {
  itemPerPage: number;
  handleItemClick: (value: number) => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const TableHeader = ({
  itemPerPage,
  handleItemClick,
  filtersOpen,
  setFiltersOpen,
  setCurrentPage,
}: TableHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="custom-table-row-select">
      <div
        onClick={() => setFiltersOpen(!filtersOpen)}
        className="custom-table-row-select-filters"
      >
        Filters
      </div>
      <div className="custom-table-row-select-rows">
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
              {[5, 10, 15, 20, 50].map((value) => (
                <div
                  key={value}
                  className={`dropdown-item ${
                    itemPerPage === value ? "active" : ""
                  }`}
                  onClick={() => {
                    handleItemClick(value);
                    setIsDropdownOpen(false);
                    setCurrentPage(1);
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
