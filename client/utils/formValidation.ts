import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: Yup.string()
    .min(3, 'Please enter no more than 40 characters')
    .required('Please enter your first name')
});

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  username: Yup.string().required('Username required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),

  password: Yup.string()
    .min(3, 'Please enter no more than 40 characters')
    .required('Please enter your first name')
});
