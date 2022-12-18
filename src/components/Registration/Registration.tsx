import React from 'react';
import { TextField } from '@mui/material';

import { AuthFooter } from '../AuthFooter';
import { AUTH_FIELDS, AUTH_VALIDATIONS } from '../../constants';
import { expectValidError } from '../../utils/expectValidError';
import { useRegistration } from './useRegistration';

import styles from './styles.module.scss';

const {
  USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH,
} = AUTH_VALIDATIONS;

const {
  FIRST_NAME, LAST_NAME, EMAIL, PASSWORD,
} = AUTH_FIELDS;

export interface RegistrationFormProps {
  lastName: string;
  firstName: string;
  password: string;
  email: string;
}

export const Registration = () => {
  const {
    isDisabled,
    errors,
    register,
    handleSubmit,
    handleRegistration,
    handleLogin,
  } = useRegistration();

  return (
    <form className={styles.wrapperRegistration} onSubmit={handleSubmit(handleRegistration)}>
      <TextField
        color="primary"
        required
        label="Имя"
        helperText={errors[FIRST_NAME]?.message}
        error={expectValidError(FIRST_NAME, errors)}
        variant="standard"
        {...register(FIRST_NAME, {
          required: true,
          maxLength: {
            value: USERNAME_MAX_LENGTH,
            message: `Максимальное количество символов ${USERNAME_MAX_LENGTH}`,
          },
          minLength: {
            value: USERNAME_MIN_LENGTH,
            message: `Минимальное количество символов ${USERNAME_MIN_LENGTH}`,
          },
          pattern: {
            value: /^[а-яА-ЯЁёa-zA-Z\s]+$/,
            message:
            'Можно указывать только английский или русские символы',
          },
        })}
        name={FIRST_NAME}
      />
      <TextField
        color="primary"
        required
        label="Фамилия"
        variant="standard"
        helperText={errors[LAST_NAME]?.message}
        error={expectValidError(LAST_NAME, errors)}
        {...register(LAST_NAME, {
          required: true,
          maxLength: {
            value: USERNAME_MAX_LENGTH,
            message: `Максимальное количество символов ${USERNAME_MAX_LENGTH}`,
          },
          minLength: {
            value: USERNAME_MIN_LENGTH,
            message: `Минимальное количество символов ${USERNAME_MIN_LENGTH}`,
          },
          pattern: {
            value: /^[а-яА-ЯЁёa-zA-Z\s]+$/,
            message:
          'Можно указывать только английский или русские символы',
          },
        })}
        name={LAST_NAME}
      />
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
        name={EMAIL}
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
        name={PASSWORD}
        type="password"
        autoComplete="on"
      />
      <AuthFooter handleActions={handleLogin} variants={['black', 'black']} buttonNames={['Регистрация', 'Войти']} disabled={isDisabled} />
    </form>
  );
};
