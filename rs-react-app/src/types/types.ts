export interface CountryItemProps {
  country: Country;
}

export interface FilterProps {
  regions: string[];
  onChange: (e: string) => void;
}

export interface Country {
  name: Name;
  population: number;
  region: string;
  flag: string;
}

interface Name {
  common: string;
  official: string;
}
