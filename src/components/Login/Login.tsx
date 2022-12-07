import React from 'react';
import { Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { AuthFooter } from '../AuthFooter';

export const Login = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate('/registration');
  };

  const handleLogin = () => {
    console.log('handleLogin');
  };
  return (
    <Box className={styles.wrapperLogin}>
      <TextField color="primary" required label="Емейл" variant="standard" name="email" type="email" />
      <TextField color="primary" required label="Пароль" variant="standard" name="password" type="password" autoComplete="on" />
      <AuthFooter handleActions={[handleRegistration, handleLogin]} variants={['black', 'black']} buttonNames={['Регистрация', 'Войти']} />
    </Box>
  );
};
