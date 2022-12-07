import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

import styles from './styles.module.scss';

interface AuthFooterProps {
  buttonNames: string[]
  variants: 'black'[]
  handleActions: Array<() => void>
}

export const AuthFooter: FC<AuthFooterProps> = ({ buttonNames, handleActions, variants }) => {
  const [variantOne, variantTwo] = variants;
  const [actionOne, actionTwo] = handleActions;
  const [nameOne, nameTwo] = buttonNames;
  return (
    <Box className={styles.wrapperAuthFooter}>
      <Button variant={variantOne} onClick={actionOne}>{nameOne}</Button>
      <Button variant={variantTwo} onClick={actionTwo}>{nameTwo}</Button>
    </Box>
  );
};
