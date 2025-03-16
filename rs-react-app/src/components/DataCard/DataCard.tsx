import { FC } from 'react';
import { StoredData } from 'src/types/form';

interface DataCardProps {
  data: StoredData;
  className: string;
}

const DataCard: FC<DataCardProps> = ({ data, className }) => {
  return (
    <div className={className}>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
      <p>Email: {data.email}</p>
      <p>Passord: {data.password}</p>
      <p>Repeat password: {data.repeatPassword}</p>
      <p>Gender: {data.gender}</p>
      <p>Accept T&C: {`${data.acceptTermsConditions}`}</p>
      <p className="card__picture">Base64 encoded picture: {data.picture}</p>
      <p>Country: {data.country}</p>
    </div>
  );
};

export default DataCard;
