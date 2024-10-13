import { useMemo, useState } from "react";

import "./customTable.scss";
//Components
import Card from "../Card";
import Pagination from "./Pagination";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import SearchInput from "./SearchInput";
import { Person } from "../../types";

interface Column<T> {
  header: string;
  key: keyof T;
}
interface CustomTableProps<T extends Person> {
  columns: Column<T>[];
  data?: T[];
}
export const CustomTable = <T extends Person>({
  columns,
  data = [],
}: CustomTableProps<T>) => {
  // States
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchValue, setCurrentSearchValue] = useState("");

  //Memoization
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchValue = currentSearchValue.toLowerCase();

      return (
        item.name?.toLowerCase().includes(searchValue) ||
        item.gender?.toLowerCase().includes(searchValue) ||
        item.birthYear?.toString().toLowerCase().includes(searchValue) ||
        item.mass?.toString().includes(searchValue) ||
        item.height?.toString().includes(searchValue)
      );
    });
  }, [currentSearchValue, data]);

  const totalCount = useMemo(
    () => Math.ceil(filteredData.length / itemPerPage),
    [filteredData, itemPerPage]
  );
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    return filteredData.slice(startIndex, startIndex + itemPerPage);
  }, [filteredData, currentPage, itemPerPage]);

  //Handlers
  const onSelectRows = (value: number) => {
    setCurrentPage(1);
    setItemPerPage(value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="custom-table">
      <div className="custom-table-content">
        <SearchInput
          setCurrentPage={setCurrentPage}
          setCurrentSearchValue={setCurrentSearchValue}
          currentSearchValue={currentSearchValue}
        />
        <TableHeader
          itemPerPage={itemPerPage}
          onSelectRows={onSelectRows}
          setCurrentPage={setCurrentPage}
          columns={columns}
        />
        <TableBody columns={columns} data={paginatedData} />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalCount={totalCount}
      />
    </Card>
  );
};
