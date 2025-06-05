import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";

interface InputSearchProps {
  id?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onPressEnter?: () => void;
  onInput?: (value: string) => void;
}

const NInputSearch: React.FC<InputSearchProps> = ({
  id,
  placeholder = "Search...",
  onSearch,
  onPressEnter,
  onInput,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onInput?.(value);
  };

  const handleSearch = () => {
    onSearch?.(inputValue);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(inputValue);
      onPressEnter?.();
    }
  };

  const handleClear = () => {
    setInputValue("");
    onSearch?.("");
  };

  return (
    <div className={`search${isFocused ? " search--focus" : ""}`}>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onInput={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {inputValue && (
        <span
          className="search__clear"
          onClick={handleClear}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClear();
          }}
        >
          <AiOutlineClose size={18} />
        </span>
      )}
      <button className="search__button" onClick={handleSearch} tabIndex={-1}>
        <CiSearch size={22} />
      </button>
    </div>
  );
};

export default NInputSearch;
