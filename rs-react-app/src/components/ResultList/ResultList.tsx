import React, { useState } from 'react';
import ResultItem from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { starshipAPI } from '../../services/starship';
import Loader from '../UI/Loader/Loader';
import { Result } from '../../types/response';
import Details from '../../pages/Details';

const ResultList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const urlPage = searchParams.get('page') || '1';

  const [shipPath, setShipPath] = useState('');
  const [isOpened, setIsOpened] = useState(true);
  const { data, isFetching, error } =
    starshipAPI.useFetchShipsPageQuery(urlPage);

  const closeDetails = () => {
    const searchParams = new URLSearchParams(location.search).toString();
    const to = searchParams.includes('&')
      ? searchParams.slice(0, searchParams.indexOf('&'))
      : '';
    navigate(`?${to}`);

    setIsOpened(false);
  };

  const handleClick = (ship: Result) => {
    setShipPath(ship.url.slice(ship.url.search(/\d+/)));
    setIsOpened(true);

    const searchParams = new URLSearchParams(location.search);
    const currentDetails = searchParams.get('details');

    if (currentDetails === ship.name) {
      searchParams.delete('details');
      setIsOpened(false);
    } else {
      searchParams.set('details', ship.name);
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
        ) : data ? (
          <>
            <div className={classes.header}>
              <div>Name</div>
              <div>Description</div>
            </div>
            <div className={classes.content}>
              {data.results.map((result) => (
                <ResultItem
                  key={result.url}
                  name={result.name}
                  model={result.model}
                  onClick={() => handleClick(result)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      {shipPath && (
        <Details
          shipPath={shipPath}
          isOpened={isOpened}
          onButtonClick={closeDetails}
        />
      )}
    </div>
  );
};

export default ResultList;
