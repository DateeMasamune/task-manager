import React, {
  ChangeEvent, FC, useContext, useState,
} from 'react';
import {
  Autocomplete, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import { Board, ColumsFromBackendProps } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { ModalFooter } from '../ModalFooter';
import { ModalWrapper } from '../ModalWrapper';

interface CreateColumnModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateColumnModal: FC<CreateColumnModalProps> = ({ open, handleClose }) => {
  const { boards, addColumns } = useContext(JusticeTaskManagerContext);
  const [newColumn, setNewColumn] = useState({});

  const handleOnChangeInputAddColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewColumn((prevState) => ({
      ...prevState,
      id: String(Date.now()),
      [name]: value,
    }));
  };

  const handleAutoCompleteAddColumn = (board: Board | null) => {
    if (!board) return;

    const { id } = board;

    setNewColumn((prevState) => ({
      ...prevState,
      boardId: id,
      items: [],
    }));
  };

  const createColumn = () => {
    addColumns(newColumn as ColumsFromBackendProps);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Добавить новую колонку</DialogTitle>
      <DialogContent>
        <ModalWrapper>
          <TextField id="standard-basic" label="Название колонки" variant="standard" name="name" onChange={handleOnChangeInputAddColumn} />
          <Autocomplete
            onChange={(_event: any, board: Board | null) => handleAutoCompleteAddColumn(board)}
            disablePortal
            id="combo-box-demo"
            options={boards}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Доски" />}
          />
          <ModalFooter
            disabled={false}
            handleClose={handleClose}
            handleCreate={createColumn}
          />
        </ModalWrapper>
      </DialogContent>
    </Dialog>
  );
};
