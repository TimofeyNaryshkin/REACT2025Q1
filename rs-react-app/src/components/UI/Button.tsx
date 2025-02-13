import React from 'react';
import { ButtonProps } from '../../types/types';

const Button: React.FC<ButtonProps> = ({
  children,
  onButtonClick,
  className,
}) => {
  return (
    <button className={className} onClick={onButtonClick}>
      {children}
    </button>
  );
};

export default Button;
