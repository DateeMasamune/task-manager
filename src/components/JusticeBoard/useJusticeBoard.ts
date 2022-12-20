import { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { UpdateBoardMutationVariables } from '../../API';
import { updateBoard } from '../../graphql/mutations';
import { Board, Column } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { SnackbarContext } from '../SnackbarContext';
import { dragOnlyColumns } from './dragOnlyColumns';
import { dragTaskOutSideColumns } from './dragTaskOutSideColumns';
import { dragTasksInsideColumns } from './dragTasksInsideColumns';

export const useJusticeBoard = () => {
  const [currentBoard, setCurrentBoard] = useState<Board>({} as Board);

  const { id: paramId } = useParams();

  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const {
    boards,
    setIdCurrentBoard,
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
      setIdCurrentBoard(paramId);
    }
  }, [paramId, boards]);

  useEffect(() => {
    if (updateBoardError) {
      addSnackbar(updateBoardError?.message);
    }
  }, [updateBoardError]);

  useEffect(() => () => setIdCurrentBoard(''), []);

  return {
    handlerOnDragEnd, currentBoard,
  };
};
