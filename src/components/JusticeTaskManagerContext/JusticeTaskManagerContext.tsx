import React, {
  createContext, FC, ReactNode, useContext, useMemo, useState,
} from 'react';

import {
  Board, Column, Task, User,
} from '../../types';
import { SnackbarContext } from '../SnackbarContext';
import { useSubscriptionWS } from '../../hooks/useSubscriptionWS';
import { useQueryApollo } from '../../hooks/useQueryApollo';

interface JusticeTaskManagerContextProps {
  boards: Board[]
  users: User[]
  addBoards: (board: Board) => void
  addColumns: (column: Column) => Board[]
  addTasks: (task: Task, idBoard: string) => Board | undefined
  updateBoard: (board: Board) => void
  renameColumn: (column: Column) => Board
  renameTask: (task: Task, idBoard: string) => Board
  removeTask: (task: Task, idBoard: string) => Board
  removeColumn: (column: Column, idBoard: string) => Board
}

interface JusticeTaskManagerContextProviderProps {
  children: ReactNode
}

export const JusticeTaskManagerContext = createContext<JusticeTaskManagerContextProps>({} as JusticeTaskManagerContextProps);

export const JusticeTaskManagerContextProvider: FC<JusticeTaskManagerContextProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { addSnackbar } = useContext(SnackbarContext);

  useSubscriptionWS({
    removeBoard,
    addBoards,
    updateBoard,
    addSnackbar,
    boards,
  });

  useQueryApollo({
    setBoards: (board: Board[]) => { setBoards(board); },
    setUsers: (user: User[]) => { setUsers(user); },
    addSnackbar,
  });

  const getBoard = (findId: string): Board[] => boards.filter(({ id }) => id === findId);

  function addBoards(board: Board) {
    setBoards((prevState) => ([...prevState, board]));
  }

  function updateBoard(board: Board) {
    const modifiedBoards = boards.map((origBoard) => {
      if (origBoard.id === board.id) {
        return board;
      }
      return origBoard;
    });

    setBoards(modifiedBoards);
  }

  function removeBoard(id: string) {
    const remove = boards.filter(({ id: boardId }) => boardId !== id);

    setBoards(remove);
  }

  const addColumns = (column: Column) => {
    const board = getBoard(column.boardId);

    return board.map((insertBoard) => ({ ...insertBoard, columns: insertBoard.columns.length > 0 ? [...insertBoard.columns, column] : [column] }));
  };

  const removeColumn = (column: Column, boardId: string) => {
    const [board] = getBoard(boardId);

    const afterRemoveColumn = board.columns.filter((col) => col).filter(({ customId }) => customId !== column.customId);

    return {
      ...board,
      columns: afterRemoveColumn,
    };
  };

  const addTasks = (task: Task, boardId: string) => {
    const [board] = getBoard(boardId);
    const copyBoard: Board = JSON.parse(JSON.stringify(board));

    if (copyBoard) {
      const column = copyBoard?.columns.filter((col) => col).find(({ customId }) => customId === task.columnId);
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

  const renameColumn = (updateNameColumn: Column) => {
    const [board] = getBoard(updateNameColumn.boardId);

    const updateColumnInBoard = board?.columns?.filter((col) => col).map((column) => {
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
    const [board] = getBoard(boardId);

    const updateNewColumn: Column[] = board.columns.filter((col) => col).map((thisColumn) => ({
      ...thisColumn,
      tasks: thisColumn.tasks.map((task) => {
        if (task.id === updateNameTask.id) return updateNameTask;
        return task;
      }),
    }));

    return {
      ...board,
      columns: updateNewColumn,
    };
  };

  const removeTask = (task: Task, boardId: string) => {
    const [board] = getBoard(boardId);

    const updateNewColumn: Column[] = board.columns.filter((col) => col).map((thisColumn) => ({
      ...thisColumn,
      tasks: thisColumn.tasks.filter(({ id }) => id !== task.id),
    }));

    return {
      ...board,
      columns: updateNewColumn,
    };
  };

  const justiceTaskManagerContextValue = useMemo(() => ({
    boards,
    users,
    addBoards,
    addColumns,
    addTasks,
    updateBoard,
    renameColumn,
    renameTask,
    removeTask,
    removeColumn,
  }), [boards, users, addBoards, addColumns, addTasks, updateBoard, renameColumn, renameTask, removeTask, removeColumn]);

  return (
    <JusticeTaskManagerContext.Provider value={justiceTaskManagerContextValue}>
      {children}
    </JusticeTaskManagerContext.Provider>
  );
};
