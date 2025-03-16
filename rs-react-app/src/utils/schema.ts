import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_EXTENSIONS = ['image/jpeg', 'image/png'];

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
  password: yup
    .string()
    .required('Password is required')
    .matches(/[0-9]/, 'At least 1 number')
    .matches(/[A-Z]/, 'At least 1 uppercase letter')
    .matches(/[a-z]/, 'At least 1 lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'At least 1 special character'),
  repeatPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required').oneOf(['woman', 'man']),
  acceptTermsConditions: yup
    .string()
    .required('Terms & Conditons accept is required'),
  picture: yup
    .mixed<FileList>()
    .required('Picture is required')
    .test(
      'pictureSize',
      `File size must be less than 5MB`,
      (value) => {
        return value && value[0].size <= MAX_FILE_SIZE;
      }
    )
    .test('pictureExtension', `Only PNG or JPEG files are allowed`, (value) => {
      return SUPPORTED_EXTENSIONS.includes(value[0].type);
    }),
  country: yup.string().required('Country is required'),
});

export default schema;
