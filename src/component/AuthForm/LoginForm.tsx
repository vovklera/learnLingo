import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginFormSchema } from '../../validation/LoginFormSchema';
import FormField from '../FormField/FormField';
import css from './AuthForm.module.css';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, getFieldState, formState } = useForm<FormValues>({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isValid, isSubmitting } = formState;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <>
      <div className={css.modalText}>
        <h1 className={css.title}>Log In</h1>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and continue your
          search for a teacher.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.formInputs}>
          <FormField
            name="email"
            label="Email"
            autoComplete="email"
            register={register}
            getFieldState={getFieldState}
            formState={formState}
          />

          <FormField
            name="password"
            label="Password"
            autoComplete="current-password"
            register={register}
            getFieldState={getFieldState}
            formState={formState}
          />
        </div>
        <button type="submit" className={css.submitButton} disabled={!isValid || isSubmitting}>
          Log In
        </button>
      </form>
    </>
  );
}
