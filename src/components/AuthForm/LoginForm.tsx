import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../firebase/config';
import { LOGIN_ERRORS } from '../../constants/authErrors';

import { LoginFormSchema } from '../../validation/LoginFormSchema';
import FormField from '../FormField/FormField';
import css from './AuthForm.module.css';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
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
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('Find user: ', user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(LOGIN_ERRORS[error.code] ?? 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
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
