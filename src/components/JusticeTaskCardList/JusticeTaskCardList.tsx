import React, { FC } from 'react';
import {
  Box,
} from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { JusticeTaskCard } from '../JusticeTaskCard/JusticeTaskCard';
import { Task } from '../../types';

import styles from './styles.module.scss';

interface JusticeTaskCardListProps {
  tasks: Task[]
  id: string
}

export const JusticeTaskCardList: FC<JusticeTaskCardListProps> = ({ tasks, id }) => (
  <Droppable droppableId={String(id)} key={id}>
    {(providedTask) => (
      <Box
        ref={providedTask.innerRef}
        {...providedTask.droppableProps}
        {...providedTask.innerRef}
        className={styles.wrapperJusticeTaskCardList}
      >
        {tasks.map(({ id: itemId, content }, index) => (
          <Draggable
            key={itemId}
            draggableId={String(itemId)}
            index={index}
          >
            {(providedItem, snapshotItem) => (
              <JusticeTaskCard providedItem={providedItem} snapshotItem={snapshotItem} content={content} itemId={itemId} />
            )}
          </Draggable>
        ))}
        {providedTask.placeholder}
      </Box>
    )}
  </Droppable>
);
