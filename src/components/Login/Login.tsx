import React from 'react';
import { TextField } from '@mui/material';

import { AuthFooter } from '../AuthFooter';
import { AUTH_FIELDS, AUTH_VALIDATIONS } from '../../constants';
import { expectValidError } from '../../utils/expectValidError';
import styles from './styles.module.scss';
import { useLogin } from './useLogin';

const {
  PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH,
} = AUTH_VALIDATIONS;

const {
  EMAIL, PASSWORD,
} = AUTH_FIELDS;

export interface LoginFormProps {
  password: string;
  email: string;
}

export const Login = () => {
  const {
    isDisabled,
    register,
    handleSubmit,
    errors,
    handleRegistration,
    handleLogin,
  } = useLogin();

  return (
    <form className={styles.wrapperLogin} onSubmit={handleSubmit(handleLogin)}>
      <TextField
        helperText={errors[EMAIL]?.message}
        error={expectValidError(EMAIL, errors)}
        {...register(EMAIL, {
          required: true,
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Не корректный адрес электронной почты',
          },
        })}
        color="primary"
        required
        label="Емейл"
        variant="standard"
        name="email"
        type="email"
      />
      <TextField
        helperText={errors[PASSWORD]?.message}
        error={expectValidError(PASSWORD, errors)}
        {...register(PASSWORD, {
          required: true,
          maxLength: {
            value: PASSWORD_MAX_LENGTH,
            message: `Максимальное количество символов ${PASSWORD_MAX_LENGTH}`,
          },
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: `Минимальное количество символов ${PASSWORD_MIN_LENGTH}`,
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            message:
          'Пароль должен состоять из специальных и английских символов, верхнего и нижнего регистра',
          },
        })}
        color="primary"
        required
        label="Пароль"
        variant="standard"
        name="password"
        type="password"
        autoComplete="on"
      />
      <AuthFooter handleActions={handleRegistration} variants={['black', 'black']} buttonNames={['Войти', 'Регистрация']} disabled={isDisabled} />
    </form>
  );
};
