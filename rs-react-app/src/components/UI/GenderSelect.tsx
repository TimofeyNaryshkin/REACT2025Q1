import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface GenderSelectProps {
  register: UseFormRegisterReturn;
  error: string;
  name: string;
}

const GenderSelect: FC<Partial<GenderSelectProps>> = ({
  register,
  error,
  name,
}) => {
  return (
    <>
      <select name={name} {...register}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <p>{error}</p>
    </>
  );
};

export default GenderSelect;
