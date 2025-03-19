export interface CountryItemProps {
  country: Country;
}

export interface CountriesListProps {
  countries: Country[];

}

export interface FilterProps {
  regions: string[];
  onChange: (e: string) => void;
}

export interface Country {
  name: Name;
  population: number;
  region: string;
  flags: Flags;
}

interface Name {
  common: string;
  official: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}
