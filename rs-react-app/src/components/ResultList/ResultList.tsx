import { useState } from 'react';
import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';
import { Result } from '../../types/response';
import Details from '../../pages/Details';
import { detailsSlice } from '../../store/reducers/DetailsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const ResultList = ({ships, detailsQuery}: {ships: Result[], detailsQuery: string | undefined}) => {

  const { toggle } = detailsSlice.actions;
  const dispatch = useAppDispatch();
  const [shipPath, setShipPath] = useState('');
  const searchQuery = useAppSelector(
    (state) => state.filterReducer.searchQuery
  );
  const isOpened = useAppSelector(state => state.detailsReducer.isOpened)

  const filteredResults = ships.filter((ship) =>
    ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  ) || []

  const closeDetails = () => {
    dispatch(toggle(false));
  };

  const handleClick = (ship: Result) => {
    if (detailsQuery === ship.name) {
      dispatch(toggle(false));
    } else {
      dispatch(toggle(true));
    }
  };
  return (
    <div className="result-container">
      <div className={classes.list}>
        {filteredResults ? (
          <>
            <div className={classes.header}>
              <div>Name</div>
              <div>Description</div>
            </div>
            <div className={classes.content}>
              {filteredResults.map((result) => (
                <ResultItem
                  key={result.url}
                  result={result}
                  onClick={() => handleClick(result)}
                />
              ))}
            </div>
          </>
        ) : (
          <h2>Nothing found D:</h2>
        )}
      </div>
      {isOpened && <Details shipPath={shipPath} onButtonClick={closeDetails} />}
    </div>
  );
};

export default ResultList;
