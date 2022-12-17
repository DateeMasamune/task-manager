import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { RegisterMutationVariables, User } from '../../API';
import { checkAllValues } from '../../utils/checkAllValues';
import { RegistrationFormProps } from './Registration';
import { register as registerGQL } from '../../graphql/mutations';
import { SnackbarContext } from '../SnackbarContext';

export const useRegistration = () => {
  const [isDisabled, setDisabled] = useState(true);

  const { addSnackbar } = useContext(SnackbarContext);

  const [registrationReq, { data, error }] = useMutation<User, RegisterMutationVariables>(registerGQL);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormProps>({ mode: 'onChange' });

  const filedsValues = getValues();

  const handleRegistration: SubmitHandler<RegistrationFormProps> = (formData) => {
    registrationReq({
      variables: {
        ...formData,
      },
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    setDisabled(!!Object.keys(errors)?.length || checkAllValues(filedsValues));
  }, [filedsValues]);

  useEffect(() => {
    if (data) {
      handleLogin();
    }

    if (error) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error?.message,
        type: 'error',
      });
    }
  }, [error, data]);

  return {
    isDisabled,
    errors,
    register,
    handleSubmit,
    handleRegistration,
    handleLogin,
  };
};
