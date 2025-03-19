import { CountryItemProps } from "src/types/types";
import classes from './CountryItem.module.css'



export default function CountryItem( {country}: CountryItemProps) {
  return (
    <div className={classes.item}>
      <p><strong>Common name: </strong>{country.name.common}</p>
      <p><strong>Oficial name: </strong>{country.name.official}</p>
      <p><strong>Population: </strong>{country.population}</p>
      <p><strong>Region: </strong>{country.region}</p>
      <figure>
        <img src={country.flags.png} alt={country.flags.alt} />
        <figcaption>png</figcaption>
      </figure>
    </div>
  )
}