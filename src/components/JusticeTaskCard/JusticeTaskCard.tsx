import React, { FC, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { CloseButton } from '../CloseButton';

import styles from './styles.module.scss';

interface JusticeTaskCardProps {
  providedItem: DraggableProvided
  snapshotItem: DraggableStateSnapshot
  content: string
  itemId: number
}

export const JusticeTaskCard: FC<JusticeTaskCardProps> = ({
  providedItem, snapshotItem, content, itemId,
}) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  const showButton = () => setShowCloseButton(true);
  const hideButton = () => setShowCloseButton(false);

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
        <Typography>
          {content}
        </Typography>
      </CardContent>
      {showCloseButton && <CloseButton itemId={itemId} />}
    </Card>
  );
};
