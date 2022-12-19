import {
  useState, useContext, ChangeEvent, useEffect,
} from 'react';
import { useMutation } from '@apollo/client';
import { Board, AddUserForBoardMutationVariables } from '../../API';
import { addUserForBoard } from '../../graphql/mutations';
import { SnackbarContext } from '../SnackbarContext';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';

interface AddUserForBoardResponse {
  addUserForBoard: Board
}

export const useAddUserModal = (handleClose: () => void) => {
  const [addedUsers, setAddedUsers] = useState<string[]>([]);
  const [boardId, setBoardId] = useState<string | null>('');

  const { addSnackbar } = useContext(SnackbarContext);
  const { updateBoard } = useContext(JusticeTaskManagerContext);

  const [addUserForBoardReq, { error: errorAddUserForBoardReq }] = useMutation<AddUserForBoardResponse, AddUserForBoardMutationVariables>(addUserForBoard);

  const handleAddUsersForBoard = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: userId, checked } = event.target;

    if (checked) {
      setAddedUsers((prevState) => ([...prevState, userId]));
    } else {
      setAddedUsers((prevState) => prevState?.filter((id) => id !== userId));
    }
  };

  const handleCreateBoard = async () => {
    if (addedUsers.length && !!boardId) {
      const board = await addUserForBoardReq({
        variables: {
          id: boardId,
          users: addedUsers,
        },
      });

      if (board?.data?.addUserForBoard) {
        // @ts-ignore
        updateBoard(board?.data?.addUserForBoard);
      }
    }
    handleClose();
  };

  useEffect(() => {
    if (errorAddUserForBoardReq) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: errorAddUserForBoardReq.message,
        type: 'error',
      });
    }
  }, [errorAddUserForBoardReq]);
  return {
    setBoardId, handleAddUsersForBoard, addedUsers, handleCreateBoard, boardId,
  };
};
