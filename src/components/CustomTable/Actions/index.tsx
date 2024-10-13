import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { FaArrowDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
interface ActionsProps {
  setCurrentPage: (value: number) => void;
  currentSearchValue: string;
  setCurrentSearchValue: (value: string) => void;
  dataToExport: unknown[];
}

const Actions = ({
  setCurrentPage,
  setCurrentSearchValue,
  currentSearchValue,
  dataToExport,
}: ActionsProps) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "star_wars_chars.xlsx");
  };

  return (
    <div className="custom-table-actions">
      <div className="custom-table-actions-search">
        <IoSearch />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setCurrentSearchValue(e.target.value);
            setCurrentPage(1);
          }}
          value={currentSearchValue}
        />
      </div>
      <FaArrowDown onClick={exportToExcel} style={{ cursor: "pointer" }} />
    </div>
  );
};

export default Actions;
