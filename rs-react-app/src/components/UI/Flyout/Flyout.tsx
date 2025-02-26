import React from 'react';
import classes from './Flyout.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Button from '../Button';
import { storedItemsSlice } from '../../../store/reducers/StoredItemsSlice';
import { useTheme } from '../../../hooks/useTheme';
import { downloadCsv } from '../../../utils/downloadCsv';

const Flyout: React.FC = () => {
  const storedItems = useAppSelector((state) => state.storedItemsReducer.items);
  const { unselectAll } = storedItemsSlice.actions;
  const dispatch = useAppDispatch();

  const darkTheme = useTheme();

  return (
    <div
      data-idtest="flyout"
      className={`${classes.flyout} ${storedItems.length ? classes.open : ''} ${darkTheme ? classes.theme_dark : ''}`.trim()}
    >
      <p>{`${storedItems.length} ${storedItems.length > 1 ? 'starships are selected' : 'starship is selected'}`}</p>
      <Button onButtonClick={() => dispatch(unselectAll([]))}>
        Unselect all
      </Button>
      <Button onButtonClick={() => downloadCsv(storedItems)}>Download</Button>
    </div>
  );
};

export default Flyout;
