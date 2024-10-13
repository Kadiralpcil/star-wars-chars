import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchInput = ({ searchValue, setSearchValue }: SearchInputProps) => {
  return (
    <div className="custom-table-actions-search">
      <IoSearch />
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
      />
    </div>
  );
};

export default SearchInput;
