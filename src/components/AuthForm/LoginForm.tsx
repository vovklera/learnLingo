import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { LOGIN_ERRORS } from '../../constants/authErrors';
import { LoginFormSchema } from '../../validation/LoginFormSchema';
import { getAuthErrorMessage } from '../../utils/authErrors';

import { loginUser } from '../../services/authService';
import FormField from '../FormField/FormField';
import css from './AuthForm.module.css';

interface FormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [error, setError] = useState('');

  const { register, handleSubmit, getFieldState, formState } = useForm<FormValues>({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isValid, isSubmitting } = formState;

  const onSubmit = async ({ email, password }: FormValues) => {
    const result = await loginUser(email, password);

    if (!result.success) {
      setError(getAuthErrorMessage(result.code, LOGIN_ERRORS));
      return;
    }

    onSuccess();
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        onFocusCapture={() => {
          if (error) {
            setError('');
          }
        }}
        className={css.form}
      >
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

        <div className={css.errorWrapp}>
          {error && (
            <span className={css.error} role="alert">
              {error}
            </span>
          )}
          <button type="submit" className={css.submitButton} disabled={!isValid || isSubmitting}>
            Log In
          </button>
        </div>
      </form>
    </>
  );
}
