import React, {
  ChangeEvent, FC, useContext, useEffect, useState,
} from 'react';
import {
  Autocomplete, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';

import { useMutation } from '@apollo/client';
import { Board, Column, Task } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { ModalFooter } from '../ModalFooter';
import { ModalWrapper } from '../ModalWrapper';
import { updateBoard } from '../../graphql/mutations';
import { UpdateBoardMutationVariables } from '../../API';
import { SnackbarContext } from '../SnackbarContext';

interface CreateTaskModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({ open, handleClose }) => {
  const { boards, addTasks } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);
  const [newTask, setNewTask] = useState({} as Task);
  const [boardSelected, setBoardSelected] = useState<Board | null>(null);

  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const handleOnChangeAddTask = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewTask((prevState) => ({
      ...prevState,
      id: String(Date.now()),
      [name]: value,
    }));
  };

  const handleAutoCompleteAddBoard = (board: Board | null) => {
    const selected = boards.find(({ id }) => id === board?.id);
    if (selected) {
      setBoardSelected(board ? selected : null);
    }
  };

  const handleAutoCompleteAddTask = (column: Column | null) => {
    if (column) {
      const { id } = column;
      setNewTask((prevState) => ({
        ...prevState,
        columnId: id,
      }));
    } else {
      // @ts-ignore
      setNewTask((prevState) => {
        const { columnId, ...rest } = prevState;

        return rest;
      });
    }
  };

  const createTask = () => {
    if (boardSelected) {
      const board = addTasks(newTask, boardSelected?.id);

      if (board) {
        updateBoardReq({
          variables: {
            Board: board,
          },
        });

        handleClose();
      }
    }
  };

  useEffect(() => {
    if (updateBoardError) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: updateBoardError?.message,
        type: 'error',
      });
    }
  }, [updateBoardError]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Добавить новую задачу</DialogTitle>
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
