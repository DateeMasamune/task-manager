import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

import styles from './styles.module.scss';

interface ModalFooterProps {
  disabled: boolean
  handleCreate: () => void
  handleClose: () => void
}

export const ModalFooter: FC<ModalFooterProps> = ({ disabled, handleCreate, handleClose }) => (
  <Box className={styles.modalFooter}>
    <Button variant="contained" disabled={disabled} onClick={handleCreate}>Создать</Button>
    <Button variant="outlined" onClick={() => handleClose()}>Отменить</Button>
  </Box>
);
