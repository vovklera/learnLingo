import * as Yup from 'yup';

export const LoginFormSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email address'),

  password: Yup.string().required('Password is required'),
});
