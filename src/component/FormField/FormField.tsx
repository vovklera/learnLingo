import type {
  FieldValues,
  FormState,
  Path,
  UseFormGetFieldState,
  UseFormRegister,
} from 'react-hook-form';
import css from './FormField.module.css';

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
  const { error, isTouched } = getFieldState(name, formState);

  const hasError = isTouched && !!error;

  return (
    <div>
      <input
        id={name}
        type={inputTypes[name]}
        placeholder={label}
        autoComplete={autoComplete}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name)}
        className={`${css.input} ${hasError ? css.errorInput : ''}`}
      />
      {error && (
        <span id={`${name}-error`} className={css.formErrors}>
          {error.message}
        </span>
      )}
    </div>
  );
}
