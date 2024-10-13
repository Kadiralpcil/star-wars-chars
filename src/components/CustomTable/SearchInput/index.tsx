import { FaArrowDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
  setCurrentPage: (value: number) => void;
  currentSearchValue: string;
  setCurrentSearchValue: (value: string) => void;
}

const SearchInput = ({
  setCurrentPage,
  setCurrentSearchValue,
  currentSearchValue,
}: SearchInputProps) => {
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
      <FaArrowDown />
    </div>
  );
};

export default SearchInput;
