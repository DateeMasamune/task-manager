import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

import styles from './styles.module.scss';
import { CANCELED, CREATE } from '../../constants';

interface ModalFooterProps {
  disabled: boolean
  handleCreate: () => void
  handleClose: () => void
}

export const ModalFooter: FC<ModalFooterProps> = ({ disabled, handleCreate, handleClose }) => (
  <Box className={styles.modalFooter}>
    <Button variant="contained" disabled={disabled} onClick={handleCreate}>{CREATE}</Button>
    <Button variant="outlined" onClick={() => handleClose()}>{CANCELED}</Button>
  </Box>
);
