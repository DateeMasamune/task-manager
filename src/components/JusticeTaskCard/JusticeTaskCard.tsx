import React, { FC, useContext, useState } from 'react';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ModeIcon from '@mui/icons-material/Mode';
import { useParams } from 'react-router-dom';
import { CloseButton } from '../CloseButton';

import styles from './styles.module.scss';
import { ChangeName } from '../ChangeName';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { Task } from '../../types';

interface JusticeTaskCardProps {
  providedItem: DraggableProvided
  snapshotItem: DraggableStateSnapshot
  task: Task
}

export const JusticeTaskCard: FC<JusticeTaskCardProps> = ({
  providedItem, snapshotItem, task,
}) => {
  const { id, content } = task;
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(false);

  const showButton = () => setShowCloseButton(true);
  const hideButton = () => setShowCloseButton(false);

  const { id: boardId } = useParams();

  const { renameTask } = useContext(JusticeTaskManagerContext);

  const handleChangeNameColumn = (text: string) => {
    const newTask = { ...task, content: text };
    console.log('newTask', newTask);
    if (boardId) {
      renameTask(newTask, boardId);
    }
    setOpenChangeName(false);
  };

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
      {showCloseButton && <CloseButton itemId={id} />}
      <Box className={styles.pen} onClick={() => setOpenChangeName(true)}>
        <ModeIcon />
      </Box>
    </Card>
  );
};
