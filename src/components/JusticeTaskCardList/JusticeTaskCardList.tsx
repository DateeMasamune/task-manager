import React, { FC } from 'react';
import {
  Box,
} from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { ItemsFromBackendProps } from '../JusticeBoard';
import { JusticeTaskCard } from '../JusticeTaskCard/JusticeTaskCard';

import styles from './styles.module.scss';

interface JusticeTaskCardListProps {
  items: ItemsFromBackendProps[]
  id: string
}

export const JusticeTaskCardList: FC<JusticeTaskCardListProps> = ({ items, id }) => (
  <Droppable droppableId={id} key={id}>
    {(providedTask) => (
      <Box
        ref={providedTask.innerRef}
        {...providedTask.droppableProps}
        {...providedTask.innerRef}
        className={styles.wrapperJusticeTaskCardList}
      >
        {items.map(({ id: itemId, content }, index) => (
          <Draggable
            key={itemId}
            draggableId={itemId}
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
