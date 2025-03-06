'use client';

import ResultItem from '@/components/ResultItem/ResultItem';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IResponse, Result } from 'types/response';
import classes from './ResultList.module.css';

import { detailsSlice } from 'store/reducers/DetailsSlice';
import Details from '@/components/Details/Details';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ResultList({ ships }: { ships: IResponse }) {
  const searchQuery = useAppSelector(
    (state) => state.filterReducer.searchQuery
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  const pathname = usePathname();

  const isOpened = useAppSelector((state) => state.detailsReducer.isOpened);
  const { toggle, setShip } = detailsSlice.actions;
  const dispatch = useAppDispatch();

  const filteredResults =
    ships.results.filter((ship) =>
      ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    ) || [];

  const closeDetails = () => {
    dispatch(toggle(false));
    router.push(pathname, { scroll: false });
  };

  const handleClick = (ship: Result) => {
    if (details === ship.name) {
      closeDetails();
    } else {
      dispatch(toggle(true));
      dispatch(setShip(ship));
      router.push(`${pathname}?details=${ship.name}`, { scroll: false });
    }
  };

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
                <ResultItem
                  key={ship.url}
                  result={ship}
                  onClick={() => handleClick(ship)}
                />
              ))}
            </div>
          </>
        ) : (
          <h2>Nothing found D:</h2>
        )}
      </div>
      {isOpened ? <Details onButtonClick={closeDetails} /> : null}
    </div>
  );
}
