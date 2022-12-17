import React, {
  ChangeEvent, FC, useContext, useEffect, useState,
} from 'react';
import {
  Autocomplete, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import { useMutation } from '@apollo/client';

import { Board, Column } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { ModalFooter } from '../ModalFooter';
import { ModalWrapper } from '../ModalWrapper';
import { updateBoard } from '../../graphql/mutations';
import { UpdateBoardMutationVariables } from '../../API';
import { SnackbarContext } from '../SnackbarContext';

interface CreateColumnModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateColumnModal: FC<CreateColumnModalProps> = ({ open, handleClose }) => {
  const [newColumn, setNewColumn] = useState({} as Column);

  const { boards, addColumns } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const handleOnChangeInputAddColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewColumn((prevState) => ({
      ...prevState,
      id: String(Date.now()),
      [name]: value,
    }));
  };

  const handleAutoCompleteAddColumn = (board: Board | null) => {
    if (board) {
      const { id } = board;

      setNewColumn((prevState) => ({
        ...prevState,
        customId: String(Date.now()),
        boardId: id,
        tasks: [],
      }));
    } else {
      // @ts-ignore
      setNewColumn((prevState) => {
        const { boardId, tasks, ...rest } = prevState;

        return rest;
      });
    }
  };

  const createColumn = () => {
    const [board] = addColumns(newColumn);
    updateBoardReq({
      variables: {
        Board: board,
      },
    });

    handleClose();
    setNewColumn({} as Column);
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
            disabled={!(newColumn?.name && newColumn?.boardId)}
            handleClose={handleClose}
            handleCreate={createColumn}
          />
        </ModalWrapper>
      </DialogContent>
    </Dialog>
  );
};
