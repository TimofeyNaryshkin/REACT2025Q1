import React from 'react';
import classes from './ResultItem.module.css';
import { ResultData } from '../../types/types';

const ResultItem: React.FC<ResultData> = ({ name, model, onClick }) => {
  return (
    <div className={classes.item} onClick={onClick}>
      <strong>{name}</strong>
      <div>
        <div>model: {model}</div>
      </div>
    </div>
  );
};

export default ResultItem;
