import { useAppSelector } from '@hooks/redux';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  register: UseFormRegisterReturn;
  error: string | undefined;
  name: string;
  type?: string;
  accept?: string;
  list?: string;
}

const FormField: FC<FormFieldProps> = ({
  register,
  error,
  name,
  type,
  accept,
  list,
}) => {
  const countries = useAppSelector((state) => state.countries);
  return (
    <>
      <label>
        {name} <input {...register} type={type} accept={accept} list={list} />
      </label>
      <p style={{ color: ' #e74c3c' }}>{error}</p>
      {list && (
        <datalist id={list}>
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      )}
    </>
  );
};

export default FormField;
