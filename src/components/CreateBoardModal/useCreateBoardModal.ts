import {
  useState, useContext, ChangeEvent, useEffect,
} from 'react';
import { useMutation } from '@apollo/client';
import { Board, CreateBoardMutationVariables } from '../../API';
import { createBoard } from '../../graphql/mutations';
import { myUser } from '../../utils/myUser';
import { SnackbarContext } from '../SnackbarContext';

interface CreateBoardResponse {
  createBoard: Board
}

export const useCreateBoardModal = (handleClose: () => void) => {
  const [newBoard, setNewBoard] = useState({} as Board);

  const { addSnackbar } = useContext(SnackbarContext);

  const { User } = myUser();

  const [createBoardReq, { error }] = useMutation<CreateBoardResponse, CreateBoardMutationVariables>(createBoard);

  const handleOnchangeInputAddBoards = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBoard((prevState) => ({
      ...prevState,
      [name]: value,
      rootUser: User?.id ?? '',
      users: [],
      columns: [],
    }));
  };

  const handleAddUsersForBoard = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setNewBoard((prevState) => ({
        ...prevState,
        users: prevState?.users ? [...prevState.users, name] : [name],
      }));
    } else {
      setNewBoard((prevState) => ({
        ...prevState,
        users: prevState?.users.filter((id) => id !== name),
      }));
    }
  };

  const handleCreateBoard = () => {
    createBoardReq({
      variables: {
        ...newBoard,
      },
    });

    handleClose();
  };

  useEffect(() => {
    if (error) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error?.message,
        type: 'error',
      });
    }
  }, [error]);

  return {
    handleOnchangeInputAddBoards, handleAddUsersForBoard, newBoard, handleCreateBoard,
  };
};
