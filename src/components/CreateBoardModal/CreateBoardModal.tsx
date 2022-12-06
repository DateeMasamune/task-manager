import React, {
  ChangeEvent, FC, useContext, useState,
} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography,
} from '@mui/material';

import { Board } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { ModalWrapper } from '../ModalWrapper';
import { ModalFooter } from '../ModalFooter';

import styles from './styles.module.scss';

interface CreateBoardModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateBoardModal: FC<CreateBoardModalProps> = ({ open, handleClose }) => {
  const [newBoard, setNewBoard] = useState({} as Board);
  const { users, addBoards } = useContext(JusticeTaskManagerContext);

  const handleOnchangeInputAddBoards = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBoard((prevState) => ({
      ...prevState,
      [name]: value,
      id: String(Date.now()),
      rootUser: 'I',
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
    addBoards(newBoard);
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
                {users.map(({ id, name }) => (
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox name={String(id)} onChange={handleAddUsersForBoard} />
            }
                    label={name}
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
