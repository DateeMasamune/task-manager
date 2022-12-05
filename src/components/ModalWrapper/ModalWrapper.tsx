import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

import styles from './styles.module.scss';

interface ModalWrapperProps {
  children: ReactNode
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ children }) => (
  <Box className={styles.modalWrapper}>
    {children}
  </Box>
);
