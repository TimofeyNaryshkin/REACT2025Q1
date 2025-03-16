import { useAppSelector } from '@hooks/redux';
import { FC, RefObject } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  register: UseFormRegisterReturn;
  error: string;
  name: string;
  type: string;
  accept: string;
  list: string;
  ref: RefObject<HTMLInputElement | null>;
  onChange: () => void;
}

const FormField: FC<Partial<FormFieldProps>> = ({
  register,
  error,
  name,
  type,
  accept,
  list,
  ref,
  onChange,
}) => {
  const countries = useAppSelector((state) => state.countries);
  return (
    <>
      <label>
        {name}{' '}
        <input
          onChange={onChange}
          ref={ref}
          {...register}
          type={type}
          accept={accept}
          list={list}
          name={name}
        />
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
