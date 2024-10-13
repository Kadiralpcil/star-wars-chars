import React, { useMemo, useState } from "react";

import "./customTable.scss";

import Card from "../Card";
import Loader from "../Loader";

import { FaArrowDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import SearchInput from "./SearchInput";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";
import TableBody from "./TableBody";

interface Column<T> {
  header: string;
  key: keyof T;
}

interface CustomTableProps<T extends { id: string; name?: string | null }> {
  columns: Column<T>[];
  data?: T[];
  onLoading?: boolean;
  itemPerPage: number;
  totalCount: number;
  onSelectItemPerPage: (value: number) => void;
  onPageChange: (value: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CustomTable = <T extends { id: string; name?: string | null }>({
  columns,
  data = [],
  onLoading,
  itemPerPage,
  onSelectItemPerPage,
  totalCount,
  onPageChange,
  currentPage,
  setCurrentPage,
}: CustomTableProps<T>) => {
  const [currentSearchValue, setCurrentSearchValue] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name?.toLowerCase().includes(currentSearchValue.toLowerCase())
    );
  }, [currentSearchValue, data]);

  const pages = useMemo(
    () => Math.ceil(totalCount / itemPerPage),
    [totalCount, itemPerPage]
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    return filteredData.slice(startIndex, startIndex + itemPerPage);
  }, [filteredData, currentPage, itemPerPage]);

  const handleItemClick = (value: number) => {
    onSelectItemPerPage(value);
  };

  if (onLoading) return <Loader />;

  return (
    <Card className="custom-table">
      <div className="custom-table-content">
        <div className="custom-table-actions">
          <SearchInput
            searchValue={currentSearchValue}
            setSearchValue={setCurrentSearchValue}
          />
          <FaArrowDown />
        </div>
        <TableHeader
          itemPerPage={itemPerPage}
          handleItemClick={handleItemClick}
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          setCurrentPage={setCurrentPage}
        />
        {filtersOpen && <div className="custom-table-filters">Gender</div>}
        <div className="custom-table-header">
          {columns.map((col) => (
            <div key={col.key as string} className="custom-table-cell">
              {col.header}
            </div>
          ))}
        </div>
        <TableBody columns={columns} data={paginatedData} navigate={navigate} />
      </div>
      <Pagination
        currentPage={currentPage}
        pages={pages}
        onPageChange={onPageChange}
      />
    </Card>
  );
};
