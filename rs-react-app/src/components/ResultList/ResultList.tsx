import ResultItem from '@/components/ResultItem/ResultItem';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { detailsSlice } from 'store/reducers/DetailsSlice';
import { IResponse, Result } from 'types/response';

export default function ResultList({ ships }: { ships: IResponse }) {
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
  /* const filteredResults =
    ships.results.filter((ship) =>
      ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    ) || []; */

  const handleClick = (ship: Result) => {
    /* setShipPath(ship.url.slice(ship.url.search(/\d+/))); */

    const searchParams = new URLSearchParams(location.search);
    const currentDetails = searchParams.get('details');

    /* if (currentDetails === ship.name) {
      searchParams.delete('details');
      dispatch(toggle(false));
    } else {
      searchParams.set('details', ship.name);
      dispatch(toggle(true));
    } */
    const to = `${location.pathname}?${searchParams.toString()}`;
    //navigate(to);
  };
  return (
    <div className="result-container">
      <div /* className={classes.list} */>
        {ships.results.length ? (
          <>
            <div /* className={classes.header} */>
              <div>Name</div>
              <div>Description</div>
            </div>
            <div /* className={classes.content} */>
              {ships.results.map((ship) => (
                <Link
                  key={ship.url}
                  href={`/details/${ship.url.slice(ship.url.search(/\d+/))}`}
                >
                  <ResultItem result={ship} onClick={() => handleClick(ship)} />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <h2>Nothing found D:</h2>
        )}
      </div>
    </div>
  );
}
