import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  DragDropContext, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { JusticeColumns } from '../JusticeColumn';
import { Column } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';

import styles from './styles.module.scss';

export const JusticeBoard = () => {
  const [currentColumns, setCurrentColumns] = useState<Column[]>([]);
  const { id: paramId } = useParams();

  const { columns, updateColumns } = useContext(JusticeTaskManagerContext);

  const handlerOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = currentColumns.find(({ id }) => String(id) === source.droppableId);
    const destColumn = currentColumns.find(({ id }) => String(id) === destination.droppableId);

    if (source.droppableId !== destination.droppableId) { // перетаскивание между колонками
      if (sourceColumn && destColumn) {
        const swapSourceItems = [...sourceColumn.items];
        const swapDestinationItems = [...destColumn.items];

        const [removedTaskFromColumn] = swapSourceItems.splice(source.index, 1);
        swapDestinationItems.splice(destination.index, 0, removedTaskFromColumn);

        const columnDestination = currentColumns.find(({ id }) => String(id) === destination.droppableId);
        const columnSource = currentColumns.find(({ id }) => String(id) === source.droppableId);

        if (columnDestination && columnSource) {
          const updatePositionTaskColumns = currentColumns.map((item) => {
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

          if (paramId) {
            setCurrentColumns(updatePositionTaskColumns);
            updateColumns(updatePositionTaskColumns, paramId);
          }
        }
      }
    } else if (sourceColumn) { // перетаскивание внутри колонки
      const swapPlaces = [...sourceColumn.items];
      const [removed] = swapPlaces.splice(source.index, 1);
      swapPlaces.splice(destination.index, 0, removed);

      const updatePositionTaskColumns = currentColumns.map((item) => {
        if (item.id === sourceColumn.id) {
          return {
            ...sourceColumn,
            items: swapPlaces,
          };
        }

        return item;
      });

      if (paramId) {
        setCurrentColumns(updatePositionTaskColumns);
        updateColumns(updatePositionTaskColumns, paramId);
      }
    } else {
      const dragColumn = [...currentColumns];

      const [removedColumn] = dragColumn.splice(source.index, 1);
      dragColumn.splice(destination.index, 0, removedColumn);

      if (paramId) { // перетаскивание колонок
        updateColumns(dragColumn, paramId);
        setCurrentColumns(dragColumn);
      }
    }
  };

  useEffect(() => {
    if (paramId && columns) {
      setCurrentColumns(columns[paramId] ?? []);
    }
  }, [paramId, columns]);

  return (
    <DragDropContext onDragEnd={handlerOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            className={styles.wrapperJusticeBoard}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <JusticeColumns columns={currentColumns} />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
