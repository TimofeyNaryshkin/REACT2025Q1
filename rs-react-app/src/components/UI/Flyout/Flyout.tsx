import React from 'react';
import classes from './Flyout.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Button from '../Button';
import { storedItemsSlice } from '../../../store/reducers/StoredItemsSlice';
import { Result } from '../../../types/response';

const Flyout: React.FC = () => {
  const storedItems = useAppSelector((state) => state.storedItemsReducer.items);
  const { unselectAll } = storedItemsSlice.actions;
  const dispatch = useAppDispatch();

  const convertToCsv = (arr: Result[]) => {
    const csvHeaders = Object.keys(arr[0]);
    const csvRows = [...arr].map((item) => Object.values(item));
    const csvArr = [csvHeaders, csvRows].map((arr) => arr.join(',')).join('\n');
    return [csvArr];
  };

  const downloadCsv = (arr: Result[]) => {
    const blob = new Blob(convertToCsv(arr), { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const fileName = `${arr.length}_starship${arr.length > 1 ? 's' : ''}.csv`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
  };

  return (
    <div
      className={`${classes.flyout} ${storedItems.length ? classes.open : ''}`}
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
