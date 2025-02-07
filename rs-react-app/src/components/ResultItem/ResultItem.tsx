import React from 'react';
import classes from './ResultItem.module.css';
import { ResultData } from '../../types/types';

const ResultItem: React.FC<ResultData> = ({
  name,
  model,
  cost_in_credits,
  crew,
  length,
  manufacturer,
  starship_class,
}) => {
  return (
    <div className={classes.item}>
      <strong>{name}</strong>
      <div>
        <div>model: {model}</div>
        <div>cost: {cost_in_credits}</div>
        <div>crew: {crew}</div>
        <div>length: {length}</div>
        <div>manufacturer: {manufacturer}</div>
        <div>class: {starship_class}</div>
      </div>
    </div>
  );
};

export default ResultItem;
