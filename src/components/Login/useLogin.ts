import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginMutationVariables, Token } from '../../API';
import { checkAllValues } from '../../utils/checkAllValues';
import { LoginFormProps } from './Login';
import { login as loginGQL } from '../../graphql/mutations';
import { SnackbarContext } from '../SnackbarContext';

interface TokenProps {
  login : Token
}

export const useLogin = () => {
  const [isDisabled, setDisabled] = useState(true);

  const { addSnackbar } = useContext(SnackbarContext);

  const [loginReq, { error, data }] = useMutation<TokenProps, LoginMutationVariables>(loginGQL);

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
    loginReq({
      variables: {
        ...formData,
      },
    });
  };

  useEffect(() => {
    setDisabled(!!Object.keys(errors)?.length || checkAllValues(filedsValues));
  }, [filedsValues]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data.login));
      navigate('/');
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: 'Вы успешно вошли в систему',
        type: 'notification',
      });
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
    register,
    handleSubmit,
    errors,
    handleRegistration,
    handleLogin,
  };
};
