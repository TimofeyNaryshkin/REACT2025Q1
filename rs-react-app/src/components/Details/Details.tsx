import { useAppSelector } from '../../hooks/redux';
import Button from '../UI/Button';
import React from 'react';

export default function Details({
  onButtonClick,
}: {
  onButtonClick: () => void;
}) {
  const ship = useAppSelector((state) => state.detailsReducer.ship);

  return (
    <div className="details">
      <Button className="details-close" onButtonClick={onButtonClick}>
        Close
      </Button>
      <div>{`cost: ${ship.cost_in_credits}`}</div>
      <div>{`crew: ${ship.crew}`}</div>
      <div>{`length: ${ship.length}`}</div>
      <div>{`manufacturer: ${ship.manufacturer}`}</div>
      <div>{`class: ${ship.starship_class}`}</div>
    </div>
  );
}
