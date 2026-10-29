import * as Yup from 'yup';

export const RegisterFormSchema = Yup.object({
  name: Yup.string().required('Name is required').min(3, 'Name too short').max(20, 'Name too long'),

  email: Yup.string().required('Email is required').email('Invalid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
