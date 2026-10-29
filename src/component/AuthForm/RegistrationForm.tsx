import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { RegisterFormSchema } from '../../validation/RegisterFormSchema';
import FormField from '../FormField/FormField';
import css from './AuthForm.module.css';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegistrationForm() {
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

  const onSubmit = (values: FormValues) => {
    console.log(values);
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
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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

        <button type="submit" className={css.submitButton} disabled={!isValid || isSubmitting}>
          Sign Up
        </button>
      </form>
    </>
  );
}
