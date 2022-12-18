import React, { FC } from 'react';
import {
  Autocomplete, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';

import { Board } from '../../types';
import { ModalFooter } from '../ModalFooter';
import { ModalWrapper } from '../ModalWrapper';
import { ADD_NEW_COLUMN } from '../../constants';
import { useCreateColumnModal } from './useCreateColumnModal';

interface CreateColumnModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateColumnModal: FC<CreateColumnModalProps> = ({ open, handleClose }) => {
  const {
    handleOnChangeInputAddColumn, handleAutoCompleteAddColumn, boards, newColumn, createColumn,
  } = useCreateColumnModal(handleClose);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{ADD_NEW_COLUMN}</DialogTitle>
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
            disabled={!(newColumn?.name && newColumn?.boardId)}
            handleClose={handleClose}
            handleCreate={createColumn}
          />
        </ModalWrapper>
      </DialogContent>
    </Dialog>
  );
};
