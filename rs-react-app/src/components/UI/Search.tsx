import React from 'react';

interface SearchProps {
  inputType: string;
  inputPlaceholder: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  inputType,
  inputValue,
  inputPlaceholder,
  onInputChange,
}) => {
  return (
    <input
      value={inputValue}
      onChange={onInputChange}
      type={inputType}
      placeholder={inputPlaceholder}
    />
  );
};

export default Search;
