import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface GenderSelectProps {
  register: UseFormRegisterReturn;
  error: string | undefined;
}

const GenderSelect: FC<GenderSelectProps> = ({ register, error }) => {
  return (
    <>
      <select {...register}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <p>{error}</p>
    </>
  );
};

export default GenderSelect;
