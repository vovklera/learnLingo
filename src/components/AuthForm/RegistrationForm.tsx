import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../firebase/config';
import { AUTH_ERRORS } from '../../constants/authErrors';

import { RegisterFormSchema } from '../../validation/RegisterFormSchema';
import FormField from '../FormField/FormField';
import css from './AuthForm.module.css';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationForm() {
  const [error, setError] = useState('');

  const { register, handleSubmit, getFieldState, formState } = useForm<FormValues>({
    resolver: yupResolver(RegisterFormSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { isValid, isSubmitting } = formState;

  const onSubmit = async ({ name, email, password }: FormValues) => {
    setError('');

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, {
        displayName: name,
      });

    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(AUTH_ERRORS[error.code] ?? 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <div className={css.modalText}>
        <h1 className={css.title}>Registration</h1>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we need some
          information. Please provide us with the following information.
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
            name="name"
            label="Name"
            autoComplete="name"
            register={register}
            getFieldState={getFieldState}
            formState={formState}
          />

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
            autoComplete="new-password"
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
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
