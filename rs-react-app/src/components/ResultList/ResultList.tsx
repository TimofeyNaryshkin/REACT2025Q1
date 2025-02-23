import React, { useState } from 'react';
import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { starshipAPI } from '../../services/starship';
import Loader from '../UI/Loader/Loader';
import { Result } from '../../types/response';
import Details from '../../pages/Details';
import { detailsSlice } from '../../store/reducers/DetailsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const ResultList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const urlPage = searchParams.get('page') || '1';

  const { toggle } = detailsSlice.actions;
  const dispatch = useAppDispatch();
  const [shipPath, setShipPath] = useState('');
  const searchQuery = useAppSelector(
    (state) => state.filterReducer.searchQuery
  );

  const { filteredResults, isFetching, error } =
    starshipAPI.useFetchShipsPageQuery(urlPage, {
      selectFromResult: ({ data, isFetching, error }) => ({
        filteredResults:
          data?.results.filter((ship) =>
            ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
          ) || [],
        isFetching,
        error,
      }),
    });

  const closeDetails = () => {
    const searchParams = new URLSearchParams(location.search).toString();
    const to = searchParams.includes('&')
      ? searchParams.slice(0, searchParams.indexOf('&'))
      : '';
    navigate(`?${to}`);

    dispatch(toggle(false));
  };

  const handleClick = (ship: Result) => {
    setShipPath(ship.url.slice(ship.url.search(/\d+/)));

    const searchParams = new URLSearchParams(location.search);
    const currentDetails = searchParams.get('details');

    if (currentDetails === ship.name) {
      searchParams.delete('details');
      dispatch(toggle(false));
    } else {
      searchParams.set('details', ship.name);
      dispatch(toggle(true));
    }
    const to = `${location.pathname}?${searchParams.toString()}`;
    navigate(to);
  };
  return (
    <div className="result-container">
      <div className={classes.list}>
        {error ? (
          <h1>Some error</h1>
        ) : isFetching ? (
          <Loader />
        ) : filteredResults.length ? (
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
      {shipPath && <Details shipPath={shipPath} onButtonClick={closeDetails} />}
    </div>
  );
};

export default ResultList;
