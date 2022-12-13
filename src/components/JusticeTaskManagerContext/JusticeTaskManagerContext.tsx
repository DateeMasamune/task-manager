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
  addColumns: (column: Column) => Board[]
  // eslint-disable-next-line no-unused-vars
  addTasks: (task: Task, idBoard: string) => Board | undefined
  // eslint-disable-next-line no-unused-vars
  addUsers: (user: User) => void
  // eslint-disable-next-line no-unused-vars
  updateColumns: (modifiedColumns: Column[], idBoard: string) => void
  // eslint-disable-next-line no-unused-vars
  updateBoard: (board: Board) => void
  // eslint-disable-next-line no-unused-vars
  renameColumn: (column: Column) => Board
  // eslint-disable-next-line no-unused-vars
  renameTask: (task: Task, idBoard: string) => Board
  // eslint-disable-next-line no-unused-vars
  removeTask: (task: Task, idBoard: string) => Board
  // eslint-disable-next-line no-unused-vars
  removeColumn: (column: Column, idBoard: string) => Board
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
      return origBoard;
    });

    setBoards(modifiedBoards);
  };

  const addColumns = (column: Column) => {
    const board: Board[] = boards.filter(({ id }) => id === column.boardId);

    return board.map((insertBoard) => ({ ...insertBoard, columns: insertBoard.columns.length > 0 ? [...insertBoard.columns, column] : [column] }));
  };

  const updateColumns = (modifiedColumns: Column[], idBoard: string) => {
    const board = boards.filter(({ id }) => id === idBoard);
    const [replaceColumns] = board.map((replaceBoard) => ({ ...replaceBoard, columns: modifiedColumns }));

    updateBoard(replaceColumns);
  };

  const removeColumn = (column: Column, boardId: string) => {
    const board: Board = boards.find(({ id }) => id === boardId) ?? {} as Board;
    const afterRemoveColumn = board.columns.filter(({ customId }) => customId !== column.customId);

    return {
      ...board,
      columns: afterRemoveColumn,
    };
  };

  const addTasks = (task: Task, idBoard: string) => {
    const board = boards.find(({ id }) => id === idBoard);
    const copyBoard: Board = JSON.parse(JSON.stringify(board));

    if (copyBoard) {
      const column = copyBoard?.columns.find(({ customId }) => customId === task.columnId);
      column?.tasks.push(task);
      copyBoard.columns = copyBoard.columns.map((origColumn) => {
        if (origColumn.customId === column?.customId) {
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

  const renameColumn = (updateNameColumn: Column) => {
    const board: Board = boards.find(({ id }) => id === updateNameColumn.boardId) ?? {} as Board;

    const updateColumnInBoard = board?.columns?.map((column) => {
      if (column.id === updateNameColumn.id) {
        return updateNameColumn;
      }
      return column;
    });

    return {
      ...board,
      columns: updateColumnInBoard,
    };
  };

  const renameTask = (updateNameTask: Task, boardId: string) => {
    const board: Board = boards.find(({ id }) => id === boardId) ?? {} as Board;
    const column: Column = board.columns.find(({ customId }) => customId === updateNameTask.columnId) ?? {} as Column;

    const updateTasks = column.tasks.map((task) => {
      if (task.id === updateNameTask.id) {
        return updateNameTask;
      }
      return task;
    });

    const updateNewColumn = board.columns.map((origColumn) => {
      if (origColumn.customId === column.customId) {
        return {
          ...column,
          tasks: updateTasks,
        };
      }
      return origColumn;
    });

    return {
      ...board,
      columns: updateNewColumn,
    };
  };

  const removeTask = (task: Task, boardId: string) => {
    const board: Board = boards.find(({ id }) => id === boardId) ?? {} as Board;
    const column: Column = board.columns.find(({ customId }) => customId === task.columnId) ?? {} as Column;

    const afterRemoveTask = column.tasks.filter(({ id }) => id !== task.id);

    const updateNewColumn = board.columns.map((origColumn) => {
      if (origColumn.customId === column.customId) {
        return {
          ...column,
          tasks: afterRemoveTask,
        };
      }
      return origColumn;
    });

    return {
      ...board,
      columns: updateNewColumn,
    };
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
    renameColumn,
    renameTask,
    removeTask,
    removeColumn,
  }), [boards, users]);

  return (
    <JusticeTaskManagerContext.Provider value={justiceTaskManagerContextValue}>
      {children}
    </JusticeTaskManagerContext.Provider>
  );
};
