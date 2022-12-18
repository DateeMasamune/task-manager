import React, {
  FC,
} from 'react';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ModeIcon from '@mui/icons-material/Mode';

import { CloseButton } from '../CloseButton';
import { ChangeName } from '../ChangeName';
import { Task } from '../../types';

import { useJusticeTaskCard } from './useJusticeTaskCard';
import styles from './styles.module.scss';

interface JusticeTaskCardProps {
  providedItem: DraggableProvided
  snapshotItem: DraggableStateSnapshot
  task: Task
}

export const JusticeTaskCard: FC<JusticeTaskCardProps> = ({
  providedItem, snapshotItem, task,
}) => {
  const {
    showButton, hideButton, openChangeName, content, handleChangeNameColumn, setOpenChangeName, showCloseButton, handleRemoveTask,
  } = useJusticeTaskCard(task);

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
