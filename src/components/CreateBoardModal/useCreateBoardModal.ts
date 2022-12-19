import {
  useState, useContext, ChangeEvent, useEffect,
} from 'react';
import { useMutation } from '@apollo/client';
import { AddUserForBoardMutationVariables, Board, CreateBoardMutationVariables } from '../../API';
import { addUserForBoard, createBoard } from '../../graphql/mutations';
import { myUser } from '../../utils/myUser';
import { SnackbarContext } from '../SnackbarContext';

interface CreateBoardResponse {
  createBoard: Board
}

export const useCreateBoardModal = (handleClose: () => void) => {
  const [newBoard, setNewBoard] = useState({} as Board);
  const [addUsers, setAddUsers] = useState<string[]>([]);

  const { addSnackbar } = useContext(SnackbarContext);

  const { User } = myUser();

  const [createBoardReq, { error: errorCreateBoardReq }] = useMutation<CreateBoardResponse, CreateBoardMutationVariables>(createBoard);
  const [addUserForBoardReq, { error: errorAddUserForBoardReq }] = useMutation<Board, AddUserForBoardMutationVariables>(addUserForBoard);

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
      setAddUsers((prevState) => (prevState.length ? [...prevState, name] : [name]
      ));
    } else {
      setAddUsers((prevState) => (prevState?.filter((id) => id !== name)
      ));
    }
  };

  const handleCreateBoard = async () => {
    const board = await createBoardReq({
      variables: {
        ...newBoard,
      },
    });

    if (board?.data?.createBoard) {
      await addUserForBoardReq({
        variables: {
          id: board?.data?.createBoard.id,
          users: addUsers,
        },
      });
    }

    handleClose();
  };

  useEffect(() => {
    if (errorCreateBoardReq) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: errorCreateBoardReq?.message,
        type: 'error',
      });
    }

    if (errorAddUserForBoardReq) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: errorAddUserForBoardReq?.message,
        type: 'error',
      });
    }
  }, [errorCreateBoardReq, errorAddUserForBoardReq]);

  return {
    handleOnchangeInputAddBoards, handleAddUsersForBoard, newBoard, handleCreateBoard,
  };
};
