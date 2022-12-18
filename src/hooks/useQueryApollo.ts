import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { getAllBoard, getUsers } from '../graphql/queries';
import { Board, User } from '../types';
import { MySnackbarOrigin } from '../components/SnackbarContext';

interface GetAllBoardResponse {
  getAllBoard: Board[]
}

interface GetUsersResponse {
  getUsers: User[]
}

interface UseQueryApolloProps {
  setBoards: (board: Board[]) => void
  setUsers: (user: User[]) => void
  addSnackbar: (notification: MySnackbarOrigin) => void
}

export const useQueryApollo = ({ setBoards, setUsers, addSnackbar }: UseQueryApolloProps) => {
  const { error: allBoardsError, data: allBoardsData } = useQuery<GetAllBoardResponse>(getAllBoard);
  const { error: getUsersError, data: getUsersData } = useQuery<GetUsersResponse>(getUsers);

  useEffect(() => {
    if (allBoardsData?.getAllBoard) {
      setBoards(allBoardsData?.getAllBoard);
    }
    if (getUsersData) {
      setUsers(getUsersData.getUsers);
    }
  }, [allBoardsData, getUsersData]);

  useEffect(() => {
    if (allBoardsError) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: allBoardsError?.message,
        type: 'error',
      });
    }
    if (getUsersError) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: getUsersError?.message,
        type: 'error',
      });
    }
  }, [allBoardsError]);
};
