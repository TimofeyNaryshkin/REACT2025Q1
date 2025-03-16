import { FC, FormEvent, useRef, useState } from 'react';
import FormField from './UI/FromField';
import GenderSelect from './UI/GenderSelect';
import schema from '@utils/schema';
import { ValidationError } from 'yup';
import PasswordStrengthMetter from './PasswordStrengthMetter/PasswordStrengthMetter';
import calcPasswordStrength from '@utils/calcPasswordStrength';
import { storeData } from '@store/formSlice';
import { useAppDispatch } from '@hooks/redux';
import { ErrorMessages, StoredData } from 'src/types/form';
import { useNavigate } from 'react-router';

const UncontrolledForm: FC = () => {
  const [errors, setErrors] = useState<Partial<ErrorMessages>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      try {
        await schema.validate(Object.fromEntries(formData), {
          abortEarly: false,
        });
        const picture = formData.get('picture') as File;
        const reader = new FileReader();
        reader.readAsDataURL(picture);
        reader.onload = () => {
          const base64String = reader.result as string;
          formData.set('picture', base64String);
          const encodedData = Object.fromEntries(
            formData
          ) as unknown as StoredData;
          dispatch(storeData(encodedData));
          navigate('/');
        };

        setErrors({});
      } catch (errors) {
        const errorMessages: Record<string, string> = {};
        if (errors instanceof ValidationError) {
          errors.inner.forEach((error) => {
            if (error.path) {
              errorMessages[error.path] = error.message;
            }
          });
          setErrors(errorMessages);
        }
      }
    }
  };

  const handlePasswordChange = () => {
    setPassword(passwordRef.current?.value || '');
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <FormField name="name" error={errors?.name} />
      <FormField name="age" error={errors?.age} />
      <FormField name="email" error={errors?.email} />
      <FormField
        onChange={handlePasswordChange}
        ref={passwordRef}
        name="password"
        type="password"
        error={errors?.password}
      />
      <PasswordStrengthMetter strength={calcPasswordStrength(password)} />
      <FormField
        name="repeatPassword"
        type="password"
        error={errors?.repeatPassword}
      />
      <GenderSelect name="gender" error={errors.gender} />
      <FormField
        name="acceptTermsConditions"
        type="checkbox"
        error={errors.acceptTermsConditions}
      />
      <FormField
        name="picture"
        type="file"
        accept=".png,.jpeg"
        error={errors.picture}
      />
      <FormField name="country" list="countries" error={errors.country} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UncontrolledForm;
