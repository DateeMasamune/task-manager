import { useSubscription } from '@apollo/client';
import { FC, useEffect } from 'react';
import {
  Board, SocketBoardCreateSubscription, SocketBoardRemoveSubscription, SocketBoardUpdateSubscription,
} from '../API';
import { MySnackbarOrigin } from '../components/SnackbarContext';
import { socketBoardCreate, socketBoardRemove, socketBoardUpdate } from '../graphql/subscriptions';
import { Task } from '../types';
import { myUser } from '../utils/myUser';

interface SocketBoardUpdateProps {
  socketBoardUpdate: Board
}

interface SocketBoardRemoveProps {
  socketBoardRemove: string
}

interface SocketBoardCreateProps {
  socketBoardCreate: Board
}

interface UseSubscriptionProps {
  // eslint-disable-next-line no-unused-vars
  addBoards: (board: Board) => void
  // eslint-disable-next-line no-unused-vars
  addTasks: (task: Task, idBoard: string) => Board | undefined
  // eslint-disable-next-line no-unused-vars
  updateBoard: (board: Board) => void
  // eslint-disable-next-line no-unused-vars
  removeBoard: (id: string) => void
  // eslint-disable-next-line no-unused-vars
  addSnackbar: (notification: MySnackbarOrigin) => void
}

export const useSubscriptionWS: FC<UseSubscriptionProps> = ({
  removeBoard, addBoards, updateBoard, addSnackbar,
}) => {
  const { User } = myUser();
  const { data: dataWsBoardUpdate } = useSubscription<SocketBoardUpdateProps, SocketBoardUpdateSubscription>(socketBoardUpdate);
  const { data: dataWsBoardRemove } = useSubscription<SocketBoardRemoveProps, SocketBoardRemoveSubscription>(socketBoardRemove);
  const { data: dataWsBoardCreate } = useSubscription<SocketBoardCreateProps, SocketBoardCreateSubscription>(socketBoardCreate);

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
      // @ts-ignore
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

  return null;
};
