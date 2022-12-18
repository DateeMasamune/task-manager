import { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Board, UpdateBoardMutationVariables } from '../../API';
import { updateBoard } from '../../graphql/mutations';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { SnackbarContext } from '../SnackbarContext';
import { Column } from '../../types';

export const useJusticeColumn = (column: Column) => {
  const [openChangeName, setOpenChangeName] = useState(false);

  const { id: boardId } = useParams();

  const { renameColumn, removeColumn } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const handleChangeNameColumn = (newName: string) => {
    const columnRename = { ...column, name: newName };
    const board = renameColumn(columnRename);

    if (board) {
      updateBoardReq({
        variables: {
          Board: board,
        },
      });
    }

    setOpenChangeName(false);
  };

  const handleRemoveColumn = (event: MouseEvent) => {
    event.stopPropagation();

    if (boardId) {
      const board = removeColumn(column, boardId);

      if (board) {
        updateBoardReq({
          variables: {
            Board: board,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (updateBoardError) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: updateBoardError.message,
        type: 'error',
      });
    }
  }, [updateBoardError]);

  return {
    setOpenChangeName, handleRemoveColumn, openChangeName, handleChangeNameColumn,
  };
};
