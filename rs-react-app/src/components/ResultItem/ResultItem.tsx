import React from 'react';
import classes from './ResultItem.module.css';
import { storedItemsSlice } from '../../store/reducers/StoredItemsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resultItemProps } from '../../types/resultItemProps';

const ResultItem: React.FC<resultItemProps> = ({ result, onClick }) => {
  const { toggleItem } = storedItemsSlice.actions;
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.storedItemsReducer.items);
  const isChecked = items?.some(ship => ship.url === result.url);

  return (
    <div className={classes.item} onClick={onClick}>
      <strong>{result.name}</strong>
      <p>model: {result.model}</p>
      <input
        onClick={(e) => e.stopPropagation()}
        onChange={() => {
          dispatch(toggleItem(result));
        }}
        className={classes.checkbox}
        type="checkbox"
        checked={isChecked}
      />
    </div>
  );
};

export default ResultItem;
