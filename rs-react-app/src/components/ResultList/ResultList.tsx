import ResultItem from '@/components/ResultItem/ResultItem';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IResponse, Result } from 'types/response';
import classes from './ResultList.module.css';
import { useRouter } from 'next/router';
import { detailsSlice } from 'store/reducers/DetailsSlice';
import Details from '@/components/Details/Details';

export default function ResultList({ ships }: { ships: IResponse }) {
  const searchQuery = useAppSelector(
    (state) => state.filterReducer.searchQuery
  );
  const router = useRouter();
  const isOpened = useAppSelector((state) => state.detailsReducer.isOpened);
  const { toggle, setShip } = detailsSlice.actions;
  const dispatch = useAppDispatch();

  const filteredResults =
    ships.results.filter((ship) =>
      ship.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    ) || [];

  const closeDetails = () => {
    dispatch(toggle(false));
    router.push(
      {
        pathname: router.pathname,
        query: { page: router.query.page },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleClick = (ship: Result) => {
    if (router.query.details === ship.name) {
      closeDetails();
    } else {
      dispatch(toggle(true));
      dispatch(setShip(ship));
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, details: ship.name },
        },
        undefined,
        { shallow: true }
      );
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
