import React, { FC } from 'react';
import { Box } from '@mui/material';

import styles from './styles.module.scss';

interface CloseButtonProps {
  removeFunction: (event: any) => void
}

export const CloseButton: FC<CloseButtonProps> = ({ removeFunction }) => (
  <Box className={styles.close} onClick={removeFunction}>
    <Box />
    <Box />
  </Box>
);
