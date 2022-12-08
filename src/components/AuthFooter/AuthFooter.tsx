import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

import styles from './styles.module.scss';

interface AuthFooterProps {
  buttonNames: string[]
  variants: 'black'[]
  handleActions: () => void
  disabled: boolean
}

export const AuthFooter: FC<AuthFooterProps> = ({
  buttonNames, handleActions, variants, disabled,
}) => {
  const [variantOne, variantTwo] = variants;
  const [nameOne, nameTwo] = buttonNames;
  return (
    <Box className={styles.wrapperAuthFooter}>
      <Button disabled={disabled} type="submit" variant={variantOne}>{nameOne}</Button>
      <Button variant={variantTwo} onClick={handleActions}>{nameTwo}</Button>
    </Box>
  );
};
