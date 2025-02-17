import React from 'react';
import { DetailsProps } from '../types/types';
import { starshipAPI } from '../services/starship';
import Loader from '../components/UI/Loader/Loader';
import Button from '../components/UI/Button';

const Details: React.FC<DetailsProps> = ({
  shipPath,
  isOpened,
  onButtonClick,
}) => {
  /* const location = useLocation();
  const result = location.state as ResultData | undefined; */
  const {
    data: ship,
    isLoading,
    error,
  } = starshipAPI.useFetchShipDetailsQuery(shipPath);

  return (
    <div className="details">
      {isLoading || !ship ? <Loader /> : null}
      {error && <h2>Cant find details</h2>}
      {ship && isOpened && (
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
      )}
    </div>
  );
};

export default Details;
