import React, {
  ChangeEvent, FC, useContext, useEffect, useState,
} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography,
} from '@mui/material';

import { useMutation } from '@apollo/client';
import { Board } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { ModalWrapper } from '../ModalWrapper';
import { ModalFooter } from '../ModalFooter';

import styles from './styles.module.scss';
import { CreateBoardMutationVariables, Board as BoardGQL } from '../../API';
import { createBoard } from '../../graphql/mutations';
import { myUser } from '../../utils/myUser';
import { SnackbarContext } from '../SnackbarContext';

interface CreateBoardModalProps {
  open: boolean
  handleClose: () => void
}

interface CreateBoardResponse {
  createBoard: BoardGQL
}

export const CreateBoardModal: FC<CreateBoardModalProps> = ({ open, handleClose }) => {
  const [newBoard, setNewBoard] = useState({} as Board);
  const { users, addBoards } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);
  const { User } = myUser();

  const [createBoardReq, { data, error }] = useMutation<CreateBoardResponse, CreateBoardMutationVariables>(createBoard);

  const handleOnchangeInputAddBoards = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBoard((prevState) => ({
      ...prevState,
      [name]: value,
      rootUser: User?.id ?? '',
      users: [],
      columns: [],
    }));
  };

  const handleAddUsersForBoard = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setNewBoard((prevState) => ({
        ...prevState,
        users: prevState?.users ? [...prevState.users, name] : [name],
      }));
    } else {
      setNewBoard((prevState) => ({
        ...prevState,
        users: prevState?.users.filter((id) => id !== name),
      }));
    }
  };

  const handleCreateBoard = () => {
    createBoardReq({
      variables: {
        ...newBoard,
      },
    });

    handleClose();
  };

  useEffect(() => {
    if (error) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error?.message,
        type: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
    // @ts-ignore
      addBoards(data?.createBoard);
    }
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="sm"
      fullWidth
      className={styles.wrapperCreateBoardModal}
    >

      <DialogTitle>Добавить новую доску</DialogTitle>
      <DialogContent>
        <ModalWrapper>
          <TextField id="standard-basic" label="Название Доски" variant="standard" name="name" onChange={handleOnchangeInputAddBoards} />
          <Accordion className={styles.accordion}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Разрешите доступ к доске</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {users.map(({ id, firstName, lastName }) => (
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox name={String(id)} onChange={handleAddUsersForBoard} />
            }
                    label={`${firstName} ${lastName}`}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <ModalFooter
            disabled={!newBoard?.name}
            handleClose={handleClose}
            handleCreate={handleCreateBoard}
          />
        </ModalWrapper>
      </DialogContent>
    </Dialog>
  );
};
