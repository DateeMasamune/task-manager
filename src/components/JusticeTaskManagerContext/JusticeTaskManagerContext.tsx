import { useQuery, useSubscription } from '@apollo/client';
import React, {
  createContext, FC, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import { usersMock } from '../../mock';
import {
  Board, Column, Task, User,
} from '../../types';
import { Board as BoardGQL, SocketBoardUpdateSubscription } from '../../API';
import { socketBoardUpdate } from '../../graphql/subscriptions';
import { getAllBoard } from '../../graphql/queries';
import { SnackbarContext } from '../SnackbarContext';

interface JusticeTaskManagerContextProps {
  boards: Board[]
  users: User[]
  // eslint-disable-next-line no-unused-vars
  addBoards: (board: Board) => void
  // eslint-disable-next-line no-unused-vars
  addColumns: (column: Column) => void
  // eslint-disable-next-line no-unused-vars
  addTasks: (task: Task, idBoard: string) => Board
  // eslint-disable-next-line no-unused-vars
  addUsers: (user: User) => void
  // eslint-disable-next-line no-unused-vars
  updateColumns: (modifiedColumns: Column[], idBoard: string) => void
  // eslint-disable-next-line no-unused-vars
  updateBoard: (board: Board) => void
}

interface JusticeTaskManagerContextProviderProps {
  children: ReactNode
}

interface SocketBoardUpdateProps {
  socketBoardUpdate: BoardGQL
}

interface GetAllBoardResponse {
  getAllBoard: BoardGQL[]
}

export const JusticeTaskManagerContext = createContext<JusticeTaskManagerContextProps>({} as JusticeTaskManagerContextProps);

export const JusticeTaskManagerContextProvider: FC<JusticeTaskManagerContextProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [users, setUsers] = useState<User[]>(usersMock);

  const { addSnackbar } = useContext(SnackbarContext);

  const { data: dataWsBoardUpdate } = useSubscription<SocketBoardUpdateProps, SocketBoardUpdateSubscription>(socketBoardUpdate);
  const { error: allBoardsError, data: allBoardsData } = useQuery<GetAllBoardResponse>(getAllBoard);

  const addBoards = (board: Board) => {
    setBoards((prevState) => ([...prevState, board]));
  };

  const updateBoard = (board: Board) => {
    const modifiedBoards = boards.map((origBoard) => {
      if (origBoard.id === board.id) {
        return board;
      }
      return board;
    });

    setBoards(modifiedBoards);
  };

  const addColumns = (column: Column) => {
    const board = boards.filter(({ id }) => id === column.boardId);

    const [insertColumn] = board.map((insertBoard) => ({ ...insertBoard, columns: insertBoard.columns.length > 0 ? [...insertBoard.columns, column] : [column] }));
    updateBoard(insertColumn);
  };

  const updateColumns = (modifiedColumns: Column[], idBoard: string) => {
    const board = boards.filter(({ id }) => id === idBoard);
    const [replaceColumns] = board.map((replaceBoard) => ({ ...replaceBoard, columns: modifiedColumns }));

    updateBoard(replaceColumns);
  };

  const addTasks = (task: Task, idBoard: string) => {
    const board = boards.find(({ id }) => id === idBoard);
    const copyBoard: Board = JSON.parse(JSON.stringify(board));

    if (copyBoard) {
      const column = copyBoard?.columns.find(({ id }) => id === task.columnId);
      column?.tasks.push(task);
      copyBoard.columns = copyBoard.columns.map((origColumn) => {
        if (origColumn.id === column?.id) {
          return column;
        }
        return origColumn;
      });
      return copyBoard;
    }
  };

  const addUsers = (user: User) => {
    setUsers((prevState) => ([...prevState, user]));
  };

  useEffect(() => {
    if (dataWsBoardUpdate) {
      console.log('dataWsBoardUpdate', dataWsBoardUpdate);

      // @ts-ignore
      updateBoard(dataWsBoardUpdate?.socketBoardUpdate);
    }
  }, [dataWsBoardUpdate]);

  useEffect(() => {
    if (allBoardsData?.getAllBoard) {
      // @ts-ignore
      setBoards(allBoardsData?.getAllBoard);
    }
  }, [allBoardsData]);

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
  }, [allBoardsError]);

  const justiceTaskManagerContextValue = useMemo(() => ({
    boards,
    users,
    addBoards,
    addColumns,
    addTasks,
    addUsers,
    updateColumns,
    updateBoard,
  }), [boards, users]);

  return (
    <JusticeTaskManagerContext.Provider value={justiceTaskManagerContextValue}>
      {children}
    </JusticeTaskManagerContext.Provider>
  );
};
