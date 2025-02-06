import React from 'react';
import classes from './ResultItem.module.css';
import { ResultItemProps } from '../../types/types';

const ResultItem: React.FC<ResultItemProps> = ({resultData}) => {
  return (
    <div className={classes.item}>
      <strong>{resultData.name}</strong>
      <div>
        <div>model: {resultData.model}</div>
        <div>cost: {resultData.cost_in_credits}</div>
        <div>crew: {resultData.crew}</div>
        <div>length: {resultData.length}</div>
        <div>manufacturer: {resultData.manufacturer}</div>
        <div>class: {resultData.starship_class}</div>
      </div>
    </div>
  );
};

export default ResultItem;