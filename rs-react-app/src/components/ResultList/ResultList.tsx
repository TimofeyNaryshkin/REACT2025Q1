import ResultItem from '@/components/ResultItem/ResultItem';
import { useAppSelector } from 'hooks/redux';
import Link from 'next/link';
import { IResponse } from 'types/response';
import classes from './ResultList.module.css';
import { ReactNode } from 'react';

export default function ResultList({
  ships,
  children,
}: {
  ships: IResponse;
  children: ReactNode;
}) {
  const searchQuery = useAppSelector(
    (state) => state.filterReducer.searchQuery
  );
  /* const { filteredResults, isFetching, error } =
    starshipAPI.useFetchShipsPageQuery(urlPage, {
      selectFromResult: ({ data, isFetching, error }) => ({
        filteredResults:
          data?.results.filter((ship) =>
            ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
          ) || [],
        isFetching,
        error,
      }),
    }); */

  /* const closeDetails = () => {
    const searchParams = new URLSearchParams(location.search).toString();
    const to = searchParams.includes('&')
      ? searchParams.slice(0, searchParams.indexOf('&'))
      : '';
    navigate(`?${to}`);

    dispatch(toggle(false));
  }; */
  const filteredResults =
    ships.results.filter((ship) =>
      ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    ) || [];

  /* const handleClick = (ship: Result) => {
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
  }; */
  return (
    <div className="result-container">
      <div className={classes.list}>
        {filteredResults.length ? (
          <>
            <div className={classes.header}>
              <p>Name</p>
              <p>Description</p>
            </div>
            <div className={classes.content}>
              {filteredResults.map((ship) => (
                <Link
                  className="item-link"
                  key={ship.url}
                  href={`/details/${ship.url.slice(ship.url.search(/\d+/))}`}
                >
                  <ResultItem result={ship} onClick={() => console.log(ship)} />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <h2>Nothing found D:</h2>
        )}
      </div>
      {children}
    </div>
  );
}
