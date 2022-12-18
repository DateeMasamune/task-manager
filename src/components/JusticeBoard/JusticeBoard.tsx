import React from 'react';
import { Box } from '@mui/material';
import {
  DragDropContext, Droppable,
} from 'react-beautiful-dnd';

import { JusticeColumns } from '../JusticeColumn';

import { useJusticeBoard } from './useJusticeBoard';
import styles from './styles.module.scss';

export const JusticeBoard = () => {
  const { handlerOnDragEnd, currentBoard } = useJusticeBoard();

  return (
    <DragDropContext onDragEnd={handlerOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            className={styles.wrapperJusticeBoard}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {currentBoard?.columns?.filter((column) => column).map((column, index) => (
              <JusticeColumns key={column?.id} column={column} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
