import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { checkAllValues } from '../../utils/checkAllValues';
import { LoginFormProps } from './Login';

export const useLogin = () => {
  const [isDisabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormProps>({ mode: 'onChange' });

  const filedsValues = getValues();

  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate('/registration');
  };

  const handleLogin: SubmitHandler<LoginFormProps> = (formData) => {
    console.log('handleLogin', formData);
  };

  useEffect(() => {
    setDisabled(!!Object.keys(errors)?.length || checkAllValues(filedsValues));
  }, [filedsValues]);

  return {
    isDisabled,
    register,
    handleSubmit,
    errors,
    handleRegistration,
    handleLogin,
  };
};
