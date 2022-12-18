import React, { FC } from 'react';
import {
  Autocomplete, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';

import { Board, Column } from '../../types';
import { ModalFooter } from '../ModalFooter';
import { ModalWrapper } from '../ModalWrapper';
import { ADD_NEW_TASK } from '../../constants';
import { useCreateTaskModal } from './useCreateTaskModal';

interface CreateTaskModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({ open, handleClose }) => {
  const {
    handleOnChangeAddTask, handleAutoCompleteAddBoard, boards, boardSelected, handleAutoCompleteAddTask, newTask, createTask,
  } = useCreateTaskModal(handleClose);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{ADD_NEW_TASK}</DialogTitle>
      <DialogContent>
        <ModalWrapper>
          <TextField id="standard-basic" label="Описание задачи" variant="standard" name="content" onChange={handleOnChangeAddTask} />
          <Autocomplete
            onChange={(_event: any, board: Board | null) => handleAutoCompleteAddBoard(board)}
            disablePortal
            id="combo-box-demo"
            options={boards}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Доски" />}
          />
          <Autocomplete
            disabled={!boardSelected}
            onChange={(_event: any, column: Column | null) => handleAutoCompleteAddTask(column)}
            disablePortal
            id="combo-box-demo"
            options={boardSelected ? boardSelected.columns : []}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Колонки" />}
          />
          <ModalFooter
            disabled={!(boardSelected && newTask?.content)}
            handleClose={handleClose}
            handleCreate={createTask}
          />
        </ModalWrapper>
      </DialogContent>
    </Dialog>
  );
};
