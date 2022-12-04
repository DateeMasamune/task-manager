import {
  Autocomplete,
  Box, Dialog, DialogContent, DialogTitle, Modal, TextField,
} from '@mui/material';
import React, { FC, useContext, useState } from 'react';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';

import styles from './styles.module.scss';

interface CreateBoardModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateBoardModal: FC<CreateBoardModalProps> = ({ open, handleClose }) => {
  const [newBoard, setNewBoard] = useState({});
  const { users, addBoards } = useContext(JusticeTaskManagerContext);

  const handleAddBoards = (event) => {
    console.log('event', event);
  };
  return (
    <Dialog
      variant="light"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Добавить новую доску</DialogTitle>
      <DialogContent>
        <TextField id="standard-basic" label="Название Доски" variant="standard" name="board-name" onChange={handleAddBoards} />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={users}
          renderInput={(params) => <TextField {...params} label="Разрешить доступ к доске" />}
        />
      </DialogContent>
    </Dialog>
  );
};
