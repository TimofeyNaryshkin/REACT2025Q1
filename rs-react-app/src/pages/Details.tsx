import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router';
import { DetailsProps } from '../types/types';

const Details: React.FC<DetailsProps> = ({ to }) => {
  const location = useLocation();
  const result = location.state;

  return (
    <div className='details'>
      <Link className='details-close' to={to}>Close</Link>
      <div>cost: {result.cost_in_credits}</div>
      <div>crew: {result.crew}</div>
      <div>length: {result.length}</div>
      <div>manufacturer: {result.manufacturer}</div>
      <div>class: {result.starship_class}</div>
    </div>
  );
};

export default Details;
