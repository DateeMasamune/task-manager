import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography,
} from '@mui/material';
import React, {
  ChangeEvent, FC, useContext, useState,
} from 'react';
import { Board } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';

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
    }));
  };
  console.log('newBoard', newBoard);

  const useUniqValuesCheckbox = (event, state, setState) => {
    if (!event.target.checked) {
      const newState = state.filter((element) => element !== event.target.name);
      setState(newState);
    } else {
      if (!state.includes(event.target.name)) {
        setState((prevState) => [...prevState, event.target.name]);
      }
      setState((prevState) => prevState);
    }
  };

  const handleOnchangeAutoCompleteAddBoards = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log('name', name);
    console.log('checked', checked);
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
              {users.map(({ id, label }) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox name={String(id)} onChange={handleOnchangeAutoCompleteAddBoards} />
            }
                  label={label}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Box className={styles.buttonContainer}>
          <Button variant="contained">Создать</Button>
          <Button variant="outlined">Отменить</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
