import React from 'react';
import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';
import { ResultListProps } from '../../types/types';
import { Link, useLocation } from 'react-router';

const ResultList: React.FC<ResultListProps> = ({ results, header }) => {
  const location = useLocation()

  return (
    <div className={classes.list}>
      <div className={classes.header}>
        <div>{header.name}</div>
        <div>{header.description}</div>
      </div>
      <div>{header.errorMessage}</div>
      <div className={classes.content}>
        {results.map((result) => {
          const searchParams = new URLSearchParams(location.search);
          searchParams.set('details', result.name);
          const to = `${location.pathname}?${searchParams.toString()}`;

          return(<Link key={result.url} to={to} state={result}>
            <ResultItem {...result}  />
          </Link>)
        })}
      </div>
    </div>
  );
};

export default ResultList;
