import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';
import { Result } from '../../types/response';
import { detailsSlice } from '../../store/reducers/DetailsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Params, useNavigate } from 'react-router';

const ResultList = ({ships, params, children}: {ships: Result[], params: Params, children: React.ReactElement}) => {
  const navigate = useNavigate()

  const { toggle } = detailsSlice.actions;
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(
    (state) => state.filterReducer.searchQuery
  );
  const isOpened = useAppSelector(state => state.detailsReducer.isOpened)

  const filteredResults = ships.filter((ship) =>
    ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  ) || []

  const closeDetails = () => {
    navigate(`/page/${params.page}`)
    dispatch(toggle(false));
  };

  const handleClick = (ship: Result) => {
    const id = ship.url.slice(ship.url.search(/\d+/), -1)
    if (params.id === id) {
      closeDetails()
    } else {
      navigate(`/page/${params.page}/details/${id}`)
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
      {isOpened && children}
    </div>
  );
};

export default ResultList;
