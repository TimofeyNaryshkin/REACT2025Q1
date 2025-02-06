import React from 'react';
import { ButtonProps } from '../../types/types';

const Button: React.FC<ButtonProps> = ({ children, onButtonClick }) => {
  return <button onClick={onButtonClick}>{children}</button>;
};

export default Button;
