import React from 'react';
import { DetailsProps } from '../types/types';
import { starshipAPI } from '../services/starship';
import Loader from '../components/UI/Loader/Loader';
import Button from '../components/UI/Button';
import { useAppSelector } from '../hooks/redux';

const Details: React.FC<DetailsProps> = ({
  shipPath,
  onButtonClick,
}) => {
  const {isOpened} = useAppSelector(state => state.detailsReducer)
  const {
    data: ship,
    isFetching,
    error,
  } = starshipAPI.useFetchShipDetailsQuery(shipPath);

  return (
    <div className="details">
      {error ? (
        <h2>Cant find details</h2>
      ) : isFetching ? (
        <Loader />
      ) : ship && isOpened ? (
        <>
          <Button className="details-close" onButtonClick={onButtonClick}>
            Close
          </Button>
          <div>{`cost: ${ship.cost_in_credits}`}</div>
          <div>{`crew: ${ship.crew}`}</div>
          <div>{`length: ${ship.length}`}</div>
          <div>{`manufacturer: ${ship.manufacturer}`}</div>
          <div>{`class: ${ship.starship_class}`}</div>
        </>
      ) : null}
    </div>
  );
};

export default Details;
