export interface SearchProps {
  inputType: string;
  inputPlaceholder: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ControlsProps extends SearchProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
