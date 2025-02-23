import React, { useState } from 'react';
import Search from '../UI/Search';
import Button from '../UI/Button';
import classes from './Controls.module.css';
import useLastSearch from '../../hooks/useLastSearch';
import { useAppDispatch } from '../../hooks/redux';
import { filterSlice } from '../../store/reducers/FilterSlice';

const Controls: React.FC = () => {
  const { setSearchQuery } = filterSlice.actions;
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useLastSearch();
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const [error, setError] = useState(false);

  const filterResults = () => {
    dispatch(setSearchQuery(searchValue));
    localStorage.setItem('lastSearch', searchValue);
  };

  if (error) {
    throw new Error('Error');
  }

  return (
    <form className={classes.controls}>
      <Search value={searchValue} onChange={changeInput} />
      <Button
        onButtonClick={(e) => {
          e.preventDefault();
          filterResults();
        }}
      >
        Search
      </Button>
      <Button
        onButtonClick={(e) => {
          e.preventDefault();
          setError(true);
        }}
      >
        Throw error
      </Button>
    </form>
  );
};

export default Controls;
