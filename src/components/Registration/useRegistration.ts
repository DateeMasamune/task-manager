import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { checkAllValues } from '../../utils/checkAllValues';
import { RegistrationFormProps } from './Registration';

export const useRegistration = () => {
  const [isDisabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormProps>({ mode: 'onChange' });

  const filedsValues = getValues();

  const handleRegistration: SubmitHandler<RegistrationFormProps> = (formData) => {
    console.log('handleRegistration', formData);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    setDisabled(!!Object.keys(errors)?.length || checkAllValues(filedsValues));
  }, [filedsValues]);

  return {
    isDisabled,
    errors,
    register,
    handleSubmit,
    handleRegistration,
    handleLogin,
  };
};
