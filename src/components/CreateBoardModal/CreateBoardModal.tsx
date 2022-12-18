import React, { FC, useContext } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography,
} from '@mui/material';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { ModalWrapper } from '../ModalWrapper';
import { ModalFooter } from '../ModalFooter';

import { ADD_NEW_BOARD, ADD_PERMISSION_BOARD } from '../../constants';
import { useCreateBoardModal } from './useCreateBoardModal';
import styles from './styles.module.scss';

interface CreateBoardModalProps {
  open: boolean
  handleClose: () => void
}

export const CreateBoardModal: FC<CreateBoardModalProps> = ({ open, handleClose }) => {
  const { users } = useContext(JusticeTaskManagerContext);

  const {
    handleOnchangeInputAddBoards, handleAddUsersForBoard, newBoard, handleCreateBoard,
  } = useCreateBoardModal(handleClose);

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

      <DialogTitle>{ADD_NEW_BOARD}</DialogTitle>
      <DialogContent>
        <ModalWrapper>
          <TextField id="standard-basic" label="Название Доски" variant="standard" name="name" onChange={handleOnchangeInputAddBoards} />
          <Accordion className={styles.accordion}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{ADD_PERMISSION_BOARD}</Typography>
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
