import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  DragDropContext, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { JusticeColumns } from '../JusticeColumn';

import styles from './styles.module.scss';
import { ColumsFromBackendProps } from '../../types';
import { columsFromBackendMock } from '../../mock';

export const JusticeBoard = () => {
  const [columns, setColumns] = useState<ColumsFromBackendProps[]>(columsFromBackendMock);

  const handlerOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns.find(({ id }) => String(id) === source.droppableId);
    const destColumn = columns.find(({ id }) => String(id) === destination.droppableId);

    const dragColumn = [...columns];

    const [removedColumn] = dragColumn.splice(source.index, 1);
    dragColumn.splice(destination.index, 0, removedColumn);

    setColumns(dragColumn);

    if (source.droppableId !== destination.droppableId) {
      if (sourceColumn && destColumn) {
        const swapSourceItems = [...sourceColumn.items];
        const swapDestinationItems = [...destColumn.items];

        const [removedTaskFromColumn] = swapSourceItems.splice(source.index, 1);
        swapDestinationItems.splice(destination.index, 0, removedTaskFromColumn);

        const columnDestination = columns.find(({ id }) => String(id) === destination.droppableId);
        const columnSource = columns.find(({ id }) => String(id) === source.droppableId);

        if (columnDestination && columnSource) {
          const updateColumns = columns.map((item) => {
            if (item.id === columnDestination.id) {
              return {
                ...columnDestination,
                items: swapDestinationItems,
              };
            }

            if (item.id === columnSource.id) {
              return {
                ...columnSource,
                items: swapSourceItems,
              };
            }

            return item;
          });

          setColumns(updateColumns);
        }
      }
    } else if (sourceColumn) {
      const swapPlaces = [...sourceColumn.items];
      const [removed] = swapPlaces.splice(source.index, 1);
      swapPlaces.splice(destination.index, 0, removed);

      const updateColumns = columns.map((item) => {
        if (item.id === sourceColumn.id) {
          return {
            ...sourceColumn,
            items: swapPlaces,
          };
        }

        return item;
      });

      setColumns(updateColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={handlerOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            className={styles.wrapperJusticeBoard}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <JusticeColumns columns={columns} />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
