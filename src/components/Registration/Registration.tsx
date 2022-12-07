import React from 'react';
import { Box, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { AuthFooter } from '../AuthFooter';

export const Registration = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    console.log('handleRegistration');
  };

  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <Box className={styles.wrapperRegistration}>
      <TextField color="primary" required label="Имя" variant="standard" name="firstName" />
      <TextField color="primary" required label="Фамилия" variant="standard" name="lastName" />
      <TextField color="primary" required label="Емейл" variant="standard" name="email" type="email" />
      <TextField color="primary" required label="Пароль" variant="standard" name="password" type="password" autoComplete="on" />
      <AuthFooter handleActions={[handleRegistration, handleLogin]} variants={['black', 'black']} buttonNames={['Регистрация', 'Войти']} />
    </Box>
  );
};
