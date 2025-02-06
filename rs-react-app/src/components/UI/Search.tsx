import React from 'react';
import { SearchProps } from '../../types/types';



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
