import React, {
  ChangeEvent, FC, useContext, useEffect, useState,
} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Autocomplete, Checkbox, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useMutation } from '@apollo/client';

import { ModalFooter } from '../ModalFooter';
import { ModalWrapper } from '../ModalWrapper';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';

import { Board } from '../../types';
import { addUserForBoard } from '../../graphql/mutations';
import { AddUserForBoardMutationVariables } from '../../API';
import { SnackbarContext } from '../SnackbarContext';

import styles from './styles.module.scss';

interface AddUserModalProps {
  open: boolean
  handleClose: () => void
}

export const AddUserModal: FC<AddUserModalProps> = ({ open, handleClose }) => {
  const [addedUsers, setAddedUsers] = useState<string[]>([]);
  const [boardId, setBoardId] = useState<string | null>('');

  const { users, boards } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const [addUserForBoardReq, { error: errorAddUserForBoardReq }] = useMutation<Board, AddUserForBoardMutationVariables>(addUserForBoard);

  const handleAddUsersForBoard = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: userId, checked } = event.target;

    if (checked) {
      setAddedUsers((prevState) => ([...prevState, userId]));
    } else {
      setAddedUsers((prevState) => prevState?.filter((id) => id !== userId));
    }
  };

  const handleCreateBoard = () => {
    if (addedUsers.length && !!boardId) {
      addUserForBoardReq({
        variables: {
          id: boardId,
          users: addedUsers,
        },
      });
    }
    handleClose();
  };

  useEffect(() => {
    if (errorAddUserForBoardReq) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: errorAddUserForBoardReq.message,
        type: 'error',
      });
    }
  }, [errorAddUserForBoardReq]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={styles.addUserModalWrapper}
    >
      <DialogTitle>Пригласить пользователя к доске</DialogTitle>
      <DialogContent>
        <ModalWrapper>
          <Autocomplete
            onChange={(_event: any, board: Board | null) => setBoardId(board ? board.id : null)}
            disablePortal
            id="combo-box-demo"
            options={boards}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Доски" />}
          />
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
            disabled={!addedUsers.length || boardId === null}
            handleClose={handleClose}
            handleCreate={handleCreateBoard}
          />
        </ModalWrapper>
      </DialogContent>
    </Dialog>
  );
};
