import React from 'react';
import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';
import { ResultData, ResultListProps } from '../../types/types';
import { useLocation, useNavigate } from 'react-router';

const ResultList: React.FC<ResultListProps> = ({ results, header }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (result: ResultData) => {
    const searchParams = new URLSearchParams(location.search);
    const currentDetails = searchParams.get('details');

    if (currentDetails === result.name) {
      searchParams.delete('details');
    } else {
      searchParams.set('details', result.name);
    }

    const to = `${location.pathname}?${searchParams.toString()}`;
    navigate(to, { state: result });
  };

  return (
    <div className={classes.list}>
      <div className={classes.header}>
        <div>{header.name}</div>
        <div>{header.description}</div>
      </div>
      <div className={classes.content}>
        {results ? (
          results.map((result) => (
            <div key={result.url} onClick={() => handleClick(result)}>
              <ResultItem {...result} />
            </div>
          ))
        ) : (
          <div>{header.errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ResultList;
