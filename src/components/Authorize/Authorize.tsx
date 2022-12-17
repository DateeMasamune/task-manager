import React, { FC, ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { myUser } from '../../utils/myUser';

interface AuthorizeProps {
  children: ReactNode
}

export const Authorize: FC<AuthorizeProps> = ({ children }) => {
  const { token } = myUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/registration');
    }
  }, []);

  return (
    <Box>
      {children}
    </Box>
  );
};
