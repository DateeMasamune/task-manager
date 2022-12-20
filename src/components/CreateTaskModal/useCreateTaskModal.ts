import {
  useState, useContext, ChangeEvent, useEffect,
} from 'react';
import { useMutation } from '@apollo/client';
import { UpdateBoardMutationVariables } from '../../API';
import { updateBoard } from '../../graphql/mutations';
import { Board, Column, Task } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { SnackbarContext } from '../SnackbarContext';

export const useCreateTaskModal = (handleClose: () => void) => {
  const [newTask, setNewTask] = useState({} as Task);
  const [boardSelected, setBoardSelected] = useState<Board | null>(null);

  const { boards, addTasks } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const handleOnChangeAddTask = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewTask((prevState) => ({
      ...prevState,
      id: String(Date.now()),
      [name]: value,
    }));
  };

  const handleAutoCompleteAddBoard = (board: Board | null) => {
    const selected = boards.find(({ id }) => id === board?.id);
    if (selected) {
      setBoardSelected(board ? selected : null);
    }
  };

  const handleAutoCompleteAddTask = (column: Column | null) => {
    if (column) {
      const { customId } = column;
      setNewTask((prevState) => ({
        ...prevState,
        columnId: customId,
      }));
    } else {
      // @ts-ignore
      setNewTask((prevState) => {
        const { columnId, ...rest } = prevState;

        return rest;
      });
    }
  };

  const createTask = () => {
    if (boardSelected) {
      const board = addTasks(newTask, boardSelected?.id);

      if (board) {
        updateBoardReq({
          variables: {
            Board: board,
          },
        });

        handleClose();
      }
    }
  };

  useEffect(() => {
    if (updateBoardError) {
      addSnackbar(updateBoardError?.message);
    }
  }, [updateBoardError]);

  return {
    updateBoardError, handleOnChangeAddTask, handleAutoCompleteAddBoard, boards, boardSelected, handleAutoCompleteAddTask, newTask, createTask,
  };
};
