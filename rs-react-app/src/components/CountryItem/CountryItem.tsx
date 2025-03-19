import { CountryItemProps } from 'src/types/types';
import classes from './CountryItem.module.css';

export default function CountryItem({ country }: CountryItemProps) {
  return (
    <div className={classes.item}>
      <p>{country.name.official}</p>
      <p>{country.population}</p>
      <p>{country.region}</p>
      <p>{country.flag}</p>
    </div>
  );
}
