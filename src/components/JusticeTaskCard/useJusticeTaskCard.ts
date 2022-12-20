import { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Board, UpdateBoardMutationVariables } from '../../API';
import { updateBoard } from '../../graphql/mutations';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { SnackbarContext } from '../SnackbarContext';
import { Task } from '../../types';

export const useJusticeTaskCard = (task: Task) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(false);

  const [updateBoardReq, { error: errorUpdateBoard }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const { content } = task;

  const showButton = () => setShowCloseButton(true);
  const hideButton = () => setShowCloseButton(false);

  const { id: boardId } = useParams();

  const { renameTask, removeTask } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const handleChangeNameColumn = (newContent: string) => {
    const newTask = { ...task, content: newContent };

    if (boardId && content !== newContent) {
      const board = renameTask(newTask, boardId);
      updateBoardReq({
        variables: {
          Board: board,
        },
      });
    }
    setOpenChangeName(false);
  };

  const handleRemoveTask = () => {
    if (boardId) {
      const board = removeTask(task, boardId);
      updateBoardReq({
        variables: {
          Board: board,
        },
      });
    }
  };

  useEffect(() => {
    if (errorUpdateBoard) {
      addSnackbar(
        errorUpdateBoard?.message,
      );
    }
  }, [errorUpdateBoard]);

  return {
    showButton, hideButton, openChangeName, content, handleChangeNameColumn, setOpenChangeName, showCloseButton, handleRemoveTask,
  };
};
