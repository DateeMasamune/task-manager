import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ModeIcon from '@mui/icons-material/Mode';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CloseButton } from '../CloseButton';

import styles from './styles.module.scss';
import { ChangeName } from '../ChangeName';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { Board, Task } from '../../types';
import { updateBoard } from '../../graphql/mutations';
import { UpdateBoardMutationVariables } from '../../API';
import { SnackbarContext } from '../SnackbarContext';

interface JusticeTaskCardProps {
  providedItem: DraggableProvided
  snapshotItem: DraggableStateSnapshot
  task: Task
}

export const JusticeTaskCard: FC<JusticeTaskCardProps> = ({
  providedItem, snapshotItem, task,
}) => {
  const { content } = task;
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(false);

  const [updateBoardReq, { error: errorUpdateBoard }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const showButton = () => setShowCloseButton(true);
  const hideButton = () => setShowCloseButton(false);

  const { id: boardId } = useParams();

  const { renameTask, removeTask } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const handleChangeNameColumn = (text: string) => {
    const newTask = { ...task, content: text };
    if (boardId) {
      const board = renameTask(newTask, boardId);
      updateBoardReq({
        variables: {
          Board: board,
        },
      });
    }
    setOpenChangeName(false);
  };

  const handleRemoveTask = () => {
    if (boardId) {
      const board = removeTask(task, boardId);
      updateBoardReq({
        variables: {
          Board: board,
        },
      });
    }
  };

  useEffect(() => {
    if (errorUpdateBoard) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: errorUpdateBoard?.message,
        type: 'error',
      });
    }
  }, [errorUpdateBoard]);

  return (
    <Card
      ref={providedItem.innerRef}
      {...providedItem.draggableProps}
      {...providedItem.dragHandleProps}
      className={styles.card}
      sx={{
        backgroundColor: snapshotItem.isDragging ? '#444444' : '#000000',
        ...providedItem.draggableProps.style,
      }}
      onMouseEnter={showButton}
      onMouseLeave={hideButton}
    >
      <CardContent className={styles.cardContent}>
        {!openChangeName
          ? (
            <Typography>
              {content}
            </Typography>
          )
          : <ChangeName className={styles.changeName} prevName={content} sendChanges={handleChangeNameColumn} hideChangeName={() => setOpenChangeName(false)} />}
      </CardContent>
      {showCloseButton && <CloseButton removeFunction={handleRemoveTask} />}
      <Box className={styles.pen} onClick={() => setOpenChangeName(true)}>
        <ModeIcon />
      </Box>
    </Card>
  );
};
