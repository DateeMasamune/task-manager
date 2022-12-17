import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  DragDropContext, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { JusticeColumns } from '../JusticeColumn';
import { Board, Column } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { updateBoard } from '../../graphql/mutations';
import { UpdateBoardMutationVariables } from '../../API';
import { SnackbarContext } from '../SnackbarContext';
import { dragTaskOutSideColumns } from './dragTaskOutSideColumns';

import styles from './styles.module.scss';
import { dragTasksInsideColumns } from './dragTasksInsideColumns';
import { dragOnlyColumns } from './dragOnlyColumns';

export const JusticeBoard = () => {
  const [currentBoard, setCurrentBoard] = useState<Board>({} as Board);

  const { id: paramId } = useParams();

  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const {
    boards,
  } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const mutationUpdateBoard = (updateColumn: Column[]) => {
    setCurrentBoard((prevState) => ({
      ...prevState,
      columns: updateColumn,
    }));

    updateBoardReq({
      variables: {
        Board: {
          ...currentBoard,
          columns: updateColumn,
        },
      },
    });
  };

  const handlerOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = currentBoard.columns.filter((col) => col).find(({ id }) => String(id) === source.droppableId);
    const destColumn = currentBoard.columns.filter((col) => col).find(({ id }) => String(id) === destination.droppableId);

    if (source.droppableId !== destination.droppableId) {
      if (sourceColumn && destColumn) {
        dragTaskOutSideColumns({
          sourceColumn,
          destColumn,
          source,
          destination,
          currentBoard,
          paramId,
          mutationUpdateBoard,
        });
      }
    } else if (sourceColumn) {
      dragTasksInsideColumns({
        sourceColumn,
        source,
        destination,
        paramId,
        currentBoard,
        mutationUpdateBoard,
      });
    } else {
      dragOnlyColumns({
        currentBoard,
        source,
        destination,
        paramId,
        mutationUpdateBoard,
      });
    }
  };

  useEffect(() => {
    if (paramId && boards) {
      setCurrentBoard(boards.find(({ id }) => id === paramId) ?? {} as Board);
    }
  }, [paramId, boards]);

  useEffect(() => {
    if (updateBoardError) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: updateBoardError?.message,
        type: 'error',
      });
    }
  }, [updateBoardError]);

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
