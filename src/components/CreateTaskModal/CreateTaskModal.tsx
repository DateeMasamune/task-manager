import React, {
  ChangeEvent, FC, useContext, useState,
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

interface CreateTaskModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({ open, handleClose }) => {
  const { boards, addTasks } = useContext(JusticeTaskManagerContext);
  const [newTask, setNewTask] = useState({} as Task);
  const [boardSelected, setBoardSelected] = useState<Board | null>(null);

  const [updateBoardReq, { error }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);
  console.log('error', error);

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
      const task = addTasks(newTask, boardSelected?.id);
      console.log('task', { ...task });

      updateBoardReq({
        variables: {
          Board: { ...task },
        },
      });

      handleClose();
    }
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
