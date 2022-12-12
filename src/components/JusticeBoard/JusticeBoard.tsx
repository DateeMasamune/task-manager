import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  DragDropContext, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { JusticeColumns } from '../JusticeColumn';
import { Board } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';

import styles from './styles.module.scss';

export const JusticeBoard = () => {
  const [currentBoard, setCurrentBoard] = useState<Board>({} as Board);
  const { id: paramId } = useParams();

  const {
    boards, updateColumns, updateBoard,
  } = useContext(JusticeTaskManagerContext);

  const handlerOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = currentBoard.columns.find(({ id }) => String(id) === source.droppableId);
    const destColumn = currentBoard.columns.find(({ id }) => String(id) === destination.droppableId);

    if (source.droppableId !== destination.droppableId) { // перетаскивание между колонками
      if (sourceColumn && destColumn) {
        const swapSourceItems = [...sourceColumn.tasks];
        const swapDestinationItems = [...destColumn.tasks];

        const [removedTaskFromColumn] = swapSourceItems.splice(source.index, 1);
        swapDestinationItems.splice(destination.index, 0, removedTaskFromColumn);

        const columnDestination = currentBoard.columns.find(({ id }) => String(id) === destination.droppableId);
        const columnSource = currentBoard.columns.find(({ id }) => String(id) === source.droppableId);

        if (columnDestination && columnSource) {
          const updatePositionTaskColumns = currentBoard.columns.map((item) => {
            if (item.id === columnDestination.id) {
              return {
                ...columnDestination,
                tasks: swapDestinationItems,
              };
            }

            if (item.id === columnSource.id) {
              return {
                ...columnSource,
                tasks: swapSourceItems,
              };
            }

            return item;
          });

          if (paramId) {
            setCurrentBoard((prevState) => ({
              ...prevState,
              columns: updatePositionTaskColumns,
            }));
            // updateBoard({
            //   ...currentBoard,
            //   columns: updatePositionTaskColumns,
            // });
          }
        }
      }
    } else if (sourceColumn) { // перетаскивание внутри колонки
      const swapPlaces = [...sourceColumn.tasks];
      const [removed] = swapPlaces.splice(source.index, 1);
      swapPlaces.splice(destination.index, 0, removed);

      const updatePositionTaskColumns = currentBoard.columns.map((item) => {
        if (item.id === sourceColumn.id) {
          return {
            ...sourceColumn,
            tasks: swapPlaces,
          };
        }

        return item;
      });

      if (paramId) {
        setCurrentBoard((prevState) => ({
          ...prevState,
          columns: updatePositionTaskColumns,
        }));
        // updateBoard({
        //   ...currentBoard,
        //   columns: updatePositionTaskColumns,
        // });
      }
    } else {
      const dragColumn = [...currentBoard.columns];

      const [removedColumn] = dragColumn.splice(source.index, 1);
      dragColumn.splice(destination.index, 0, removedColumn);

      if (paramId) { // перетаскивание колонок
        // updateColumns(dragColumn, paramId);
        setCurrentBoard((prevState) => ({
          ...prevState,
          columns: dragColumn,
        }));
      }
    }
  };

  useEffect(() => {
    if (paramId && boards) {
      setCurrentBoard(boards.find(({ id }) => id === paramId) ?? {} as Board);
    }
  }, [paramId, boards]);

  useEffect(() => {

  }, [currentBoard]);

  return (
    <DragDropContext onDragEnd={handlerOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            className={styles.wrapperJusticeBoard}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {currentBoard?.columns?.map((column, index) => (
              <JusticeColumns key={column.id} column={column} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
