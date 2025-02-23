export interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ControlsProps extends SearchProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface ResultListProps {
  results: ResultData[];
  header: HeaderInterface;
}

export interface HeaderInterface {
  name: string;
  description: string;
  errorMessage: string;
}

export interface ResultData {
  name: string;
  model: string;
  cost_in_credits: string;
  crew: string;
  length: string;
  manufacturer: string;
  starship_class: string;
  url: string;
  onClick?: () => void;
}

export interface PaginationProps {
  pagesArr: number[];
  page: number;
  onButtonClick: (p: number) => void;
}

export interface DetailsProps {
  shipPath: string;
  onButtonClick: () => void;
}
