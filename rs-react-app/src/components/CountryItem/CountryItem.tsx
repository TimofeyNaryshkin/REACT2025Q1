import { Country, CountryItemProps } from 'src/types/types';
import classes from './CountryItem.module.css';
import { memo, useEffect, useState } from 'react';

const CountryItem = memo(function CountryItem({ country }: CountryItemProps) {
  const [isStored, setIsStored] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(
      localStorage.getItem('storedItems') || '[]'
    ) as Country[];
    if (
      storedItems.some((item) => item.name.official === country.name.official)
    ) {
      setIsStored(true);
    }
  }, [country]);

  const storeItem = (country: Country) => {
    const storedItems = JSON.parse(
      localStorage.getItem('storedItems') || '[]'
    ) as Country[];
    if (
      storedItems.some((item) => item.name.official === country.name.official)
    ) {
      return;
    }
    storedItems.push({
      name: country.name,
      population: country.population,
      region: country.region,
      flag: country.flag,
    });
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
    setIsStored(true);
  };

  return (
    <div
      onClick={() => storeItem(country)}
      className={classes.item + (isStored ? ` ${classes.stored}` : '')}
    >
      <p>{country.flag}</p>
      <p>{country.name.official}</p>
      <p>{country.population}</p>
      <p>{country.region}</p>
    </div>
  );
});

export default CountryItem;
