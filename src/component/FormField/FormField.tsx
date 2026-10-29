import type {
  FieldValues,
  FormState,
  Path,
  UseFormGetFieldState,
  UseFormRegister,
} from 'react-hook-form';
import css from './FormField.module.css';
import { useState } from 'react';

const inputTypes = {
  name: 'text',
  email: 'email',
  password: 'password',
};

type InputTypeName = keyof typeof inputTypes;

interface FormFieldProps<T extends FieldValues> {
  name: Path<T> & InputTypeName;
  label: string;
  autoComplete: string;
  register: UseFormRegister<T>;
  getFieldState: UseFormGetFieldState<T>;
  formState: FormState<T>;
}

export default function FormField<T extends FieldValues>({
  name,
  label,
  autoComplete,
  register,
  getFieldState,
  formState,
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const { error, isTouched } = getFieldState(name, formState);
  const hasError = isTouched && !!error;

  return (
    <div>
      <div className={css.inputWrapper}>
        <input
          id={name}
          type={name === 'password' && showPassword ? 'text' : inputTypes[name]}
          placeholder={label}
          autoComplete={autoComplete}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name)}
          className={`${css.input} ${hasError ? css.errorInput : ''}`}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={css.passwordToggle}
          >
            {showPassword ? (
              <svg width="20" height="20" aria-hidden="true" className={css.eyeIcon}>
                <use href="/icons.svg#eye-on-icon" />
              </svg>
            ) : (
              <svg width="20" height="20" aria-hidden="true" className={css.eyeIcon}>
                <use href="/icons.svg#eye-off-icon" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <span id={`${name}-error`} className={css.formErrors}>
          {error.message}
        </span>
      )}
    </div>
  );
}
