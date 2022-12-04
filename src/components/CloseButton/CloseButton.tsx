import React, { FC } from 'react';
import { Box } from '@mui/material';

import styles from './styles.module.scss';

interface CloseButtonProps {
  itemId: number
}

export const CloseButton: FC<CloseButtonProps> = ({ itemId }) => {
  const handleDeleteTask = (id: number) => {
    console.log('delete-id', id);
  };

  return (
    <Box className={styles.close} onClick={() => handleDeleteTask(itemId)}>
      <Box />
      <Box />
    </Box>
  );
};
