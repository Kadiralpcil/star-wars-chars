import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
interface TableHeaderProps<T> {
  itemPerPage: number;
  onSelectRows: (value: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  columns: { header: string; key: keyof T }[];
}

const TableHeader = <T extends { id: string; name?: string | null }>({
  itemPerPage,
  onSelectRows,
  setCurrentPage,
  columns,
}: TableHeaderProps<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="custom-table-row-select">
        <div className="custom-table-row-select-rows">
          <div>Rows per page: {itemPerPage}</div>
          <div className="dropdown-wrapper">
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <MdOutlineKeyboardArrowDown color="#ffd700" />
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
                      onSelectRows(value);
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

      <div className="custom-table-header">
        {columns.map((col) => (
          <div key={col.key as string} className="custom-table-cell">
            {col.header}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableHeader;
