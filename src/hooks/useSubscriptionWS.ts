import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';

import {
  SocketAddUserForBoardSubscriptionVariables, SocketBoardCreateSubscription, SocketBoardRemoveSubscription, SocketBoardUpdateSubscription,
} from '../API';
import { MySnackbarOrigin } from '../components/SnackbarContext';
import {
  socketAddUserForBoard, socketBoardCreate, socketBoardRemove, socketBoardUpdate,
} from '../graphql/subscriptions';
import { Board } from '../types';
import { myUser } from '../utils/myUser';

interface SocketBoardResponse {
  [key: string]: Board
}

interface SocketBoardRemoveProps {
  socketBoardRemove: string
}

interface UseSubscriptionProps {
  addBoards: (board: Board) => void
  updateBoard: (board: Board) => void
  removeBoard: (id: string) => void
  addSnackbar: (notification: MySnackbarOrigin) => void
  boards: Board[]
}

export const useSubscriptionWS = ({
  removeBoard, addBoards, updateBoard, addSnackbar, boards,
}: UseSubscriptionProps) => {
  const { User } = myUser();
  const { data: dataWsBoardUpdate } = useSubscription<SocketBoardResponse, SocketBoardUpdateSubscription>(socketBoardUpdate);
  const { data: dataWsBoardRemove } = useSubscription<SocketBoardRemoveProps, SocketBoardRemoveSubscription>(socketBoardRemove);
  const { data: dataWsBoardCreate } = useSubscription<SocketBoardResponse, SocketBoardCreateSubscription>(socketBoardCreate);
  const { data: dataWsAddUserForBoard } = useSubscription<SocketBoardResponse, SocketAddUserForBoardSubscriptionVariables>(socketAddUserForBoard, {
    variables: {
      rootUser: User?.id ?? '',
    },
  });

  useEffect(() => {
    if (dataWsAddUserForBoard) {
      const { name, rootUser, id } = dataWsAddUserForBoard.socketAddUserForBoard;

      const [board] = boards.filter(({ id: boardId }) => boardId === id);

      const checkMyInBoard = board.users.includes(User?.id ?? '');

      if (rootUser !== User?.id) {
        updateBoard(dataWsAddUserForBoard.socketAddUserForBoard);
        if (!checkMyInBoard) {
          addSnackbar({
            open: true,
            vertical: 'top',
            horizontal: 'center',
            message: `Вас пригласили к доске ${name}`,
            type: 'notification',
          });
        }
      }
    }
  }, [dataWsAddUserForBoard]);

  useEffect(() => {
    if (dataWsBoardRemove) {
      removeBoard(dataWsBoardRemove.socketBoardRemove);
    }
  }, [dataWsBoardRemove]);

  useEffect(() => {
    if (dataWsBoardCreate) {
      addBoards(dataWsBoardCreate.socketBoardCreate);
    }
  }, [dataWsBoardCreate]);

  useEffect(() => {
    if (dataWsBoardUpdate) {
      updateBoard(dataWsBoardUpdate?.socketBoardUpdate);
      const { name, rootUser } = dataWsBoardUpdate?.socketBoardUpdate;

      if (rootUser !== User?.id) {
        addSnackbar({
          open: true,
          vertical: 'top',
          horizontal: 'center',
          message: `Доска ${name} изменилась, проверьте пожалуйста`,
          type: 'notification',
        });
      }
    }
  }, [dataWsBoardUpdate]);
};
