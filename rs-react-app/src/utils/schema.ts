import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_EXTENSIONS = ['image/jpeg', 'image/png'];
const SUPPORTED_GENDERS = ['female', 'male'];

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must be capitalized'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required'),
  repeatPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required').oneOf(SUPPORTED_GENDERS),
  acceptTermsConditions: yup
    .boolean()
    .required()
    .oneOf([true], 'Terms & Conditons accept is required'),
  picture: yup
    .mixed<FileList>()
    .required('Picture is required')
    .test('pictureSize', `File size must be less than 5MB`, (value) => {
      return value[0] && value[0].size <= MAX_FILE_SIZE;
    })
    .test('pictureExtension', `Only PNG or JPEG files are allowed`, (value) => {
      return value[0] && SUPPORTED_EXTENSIONS.includes(value[0].type);
    }),
  country: yup.string().required('Country is required'),
});

export default schema;
