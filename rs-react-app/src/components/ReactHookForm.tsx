import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@utils/schema';
import { FormData } from 'src/types/form';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useNavigate } from 'react-router';
import { storeData } from '@store/formSlice'


const ReactHookForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const { countries } = useAppSelector(state => state.countries)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  const onSubmit: SubmitHandler<FormData> = (data) => {
    navigate('/')
    const picture = data.picture[0]
    const reader = new FileReader()
    reader.readAsDataURL(picture)
    reader.onload = () => {
      const base64String = reader.result as string
      const encodedData = {...data, picture: base64String}
      dispatch(storeData(encodedData))
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name: <input {...register('name')} />
      </label>
      <p>{errors.name?.message}</p>
      <label>
        Age: <input {...register('age')} type="number" />
      </label>
      <p>{errors.age?.message}</p>
      <label>
        Email: <input {...register('email')} type="email" />
      </label>
      <p>{errors.email?.message}</p>
      <label>
        Password: <input {...register('password')} type="password" />
      </label>
      <p>{errors.password?.message}</p>
      <label>
        Repeat password: <input {...register('repeatPassword')} />
      </label>
      <p>{errors.repeatPassword?.message}</p>
      <select {...register('gender')}>
        <option value="woman">woman</option>
        <option value="man">man</option>
      </select>
      <p>{errors.gender?.message}</p>
      <label>
        Accept Terms & Conditions
        <input {...register('acceptTermsConditions')} type="checkbox" />
      </label>
      <p>{errors.acceptTermsConditions?.message}</p>
      <label>
        Picture: <input {...register('picture')} type="file" accept='.png,.jpeg' />
      </label>
      <p>{errors.picture?.message}</p>
      <label>
        Country: <input list="countries" {...register('country')} />
      </label>
      <p>{errors.country?.message}</p>
      <datalist id='countries'>
        {countries.map(country => <option value={country} />)}
      </datalist>
      <input type="submit" />

      {/* {{Object.keys(schema.fields).map((key) => {
        const type = getType(key);
        return (
          <label key={key}>
            {key === 'gender' ? (
              <select {...register(key as FormKeys)}>
                <option value="woman">woman</option>
                <option value="man">man</option>
              </select>
            ) : (
              <>
                {`${key}: `}
                <input
                  {...register(key as FormKeys)}
                  type={type}
                  value={key === 'gender' ? 'woman' : undefined}
                />
              </>
            )}
            <p>{errors[key as FormKeys]?.message}</p>
          </label>
        );
      })}
      <input type="submit" />} */}
    </form>
  );
};

export default ReactHookForm;
