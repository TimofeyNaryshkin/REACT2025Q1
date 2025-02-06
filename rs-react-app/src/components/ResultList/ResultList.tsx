import React from 'react';
import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';
import { ResultListProps } from '../../types/types';

const ResultList: React.FC<ResultListProps> = ({ results, header }) => {
  return (
    <div className={classes.list}>
      <div className={classes.header}>
        <div>{header.name}</div>
        <div>{header.description}</div>
      </div>
      <div className={classes.content}>
        {results.map((result) => (
          <ResultItem resultData={result} key={result.url} />
        ))}
      </div>
    </div>
  );
};

export default ResultList;
