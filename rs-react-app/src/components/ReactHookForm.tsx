import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@utils/schema';
import { FormData } from 'src/types/form';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router';
import { storeData } from '@store/formSlice';
import PasswordStrengthMetter from './PasswordStrengthMetter/PasswordStrengthMetter';
import calcPasswordStrength from '@utils/calcPasswordStrength';
import FormField from './UI/FromField';
import GenderSelect from './UI/GenderSelect';

const ReactHookForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: 'onChange' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    navigate('/');
    if (data.picture instanceof FileList) {
      const picture = data.picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(picture);
      reader.onload = () => {
        const base64String = reader.result as string;
        const encodedData = { ...data, picture: base64String };
        dispatch(storeData(encodedData));
      };
    }
  };

  const password = watch('password');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="name"
        error={errors.name?.message}
        register={register('name')}
      />
      <FormField
        name="age"
        error={errors.age?.message}
        register={register('age')}
      />
      <FormField
        name="email"
        error={errors.email?.message}
        register={register('email')}
      />
      <FormField
        name="password"
        type="password"
        error={errors.password?.message}
        register={register('password')}
      />
      {password && (
        <PasswordStrengthMetter strength={calcPasswordStrength(password)} />
      )}
      <FormField
        name="repeatPassword"
        type="password"
        error={errors.repeatPassword?.message}
        register={register('repeatPassword')}
      />
      <GenderSelect
        register={register('gender')}
        error={errors.gender?.message}
      />
      <FormField
        name="acceptTermsConditions"
        type="checkbox"
        error={errors.acceptTermsConditions?.message}
        register={register('acceptTermsConditions')}
      />
      <FormField
        name="picture"
        type="file"
        accept=".png,.jpeg"
        error={errors.picture?.message}
        register={register('picture')}
      />
      <FormField
        name="country"
        list="countries"
        error={errors.country?.message}
        register={register('country')}
      />
      <input type="submit" disabled={!isValid} />
    </form>
  );
};

export default ReactHookForm;
