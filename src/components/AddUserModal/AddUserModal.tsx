import React, { FC, useContext } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Autocomplete, Checkbox, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';

import { ModalFooter } from '../ModalFooter';
import { ModalWrapper } from '../ModalWrapper';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';

import { Board } from '../../types';

import { useAddUserModal } from './useAddUserModal';
import { ADD_USER_FOR_BOARD } from '../../constants';
import styles from './styles.module.scss';

interface AddUserModalProps {
  open: boolean
  handleClose: () => void
}

export const AddUserModal: FC<AddUserModalProps> = ({ open, handleClose }) => {
  const {
    setBoardId, handleAddUsersForBoard, addedUsers, handleCreateBoard, boardId,
  } = useAddUserModal(handleClose);

  const { users, boards } = useContext(JusticeTaskManagerContext);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={styles.addUserModalWrapper}
    >
      <DialogTitle>{ADD_USER_FOR_BOARD}</DialogTitle>
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
