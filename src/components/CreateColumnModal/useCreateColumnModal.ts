import { useMutation } from '@apollo/client';
import {
  useState, useContext, ChangeEvent, useEffect,
} from 'react';
import { UpdateBoardMutationVariables } from '../../API';
import { updateBoard } from '../../graphql/mutations';
import { Board, Column } from '../../types';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { SnackbarContext } from '../SnackbarContext';

export const useCreateColumnModal = (handleClose: () => void) => {
  const [newColumn, setNewColumn] = useState({} as Column);

  const { boards, addColumns } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const handleOnChangeInputAddColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewColumn((prevState) => ({
      ...prevState,
      id: String(Date.now()),
      [name]: value,
    }));
  };

  const handleAutoCompleteAddColumn = (board: Board | null) => {
    if (board) {
      const { id } = board;

      setNewColumn((prevState) => ({
        ...prevState,
        customId: String(Date.now()),
        boardId: id,
        tasks: [],
      }));
    } else {
      // @ts-ignore
      setNewColumn((prevState) => {
        const { boardId, tasks, ...rest } = prevState;

        return rest;
      });
    }
  };

  const createColumn = () => {
    const [board] = addColumns(newColumn);
    updateBoardReq({
      variables: {
        Board: board,
      },
    });

    handleClose();
    setNewColumn({} as Column);
  };

  useEffect(() => {
    if (updateBoardError) {
      addSnackbar(updateBoardError?.message);
    }
  }, [updateBoardError]);

  return {
    handleOnChangeInputAddColumn, handleAutoCompleteAddColumn, boards, newColumn, createColumn,
  };
};
