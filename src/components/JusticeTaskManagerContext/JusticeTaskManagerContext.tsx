import React, {
  createContext, FC, ReactNode, useMemo, useState,
} from 'react';
import { boardsMock, usersMock } from '../../mock';
import {
  Board, ColumsFromBackendProps, ItemsFromBackendProps, Users,
} from '../../types';

interface JusticeTaskManagerContextProps {
  boards: Board[]
  columns: ColumsFromBackendProps[]
  tasks: ItemsFromBackendProps[]
  // eslint-disable-next-line no-unused-vars
  addBoards: (board: Board) => void
  // eslint-disable-next-line no-unused-vars
  addColumns: (column: ColumsFromBackendProps) => void
  // eslint-disable-next-line no-unused-vars
  addTasks: (task: ItemsFromBackendProps) => void
  // eslint-disable-next-line no-unused-vars
  addUsers: (user: Users) => void
}

interface JusticeTaskManagerContextProviderProps {
  children: ReactNode
}

export const JusticeTaskManagerContext = createContext<JusticeTaskManagerContextProps>({} as JusticeTaskManagerContextProps);

export const JusticeTaskManagerContextProvider: FC<JusticeTaskManagerContextProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>(boardsMock);
  const [columns, setColumns] = useState<ColumsFromBackendProps[]>([]);
  const [tasks, setTasks] = useState<ItemsFromBackendProps[]>([]);
  const [users, setUsers] = useState<Users[]>(usersMock);

  const addBoards = (board: Board) => {
    setBoards((prevState) => ([...prevState, board]));
  };

  const addColumns = (column: ColumsFromBackendProps) => {
    setColumns((prevState) => ([...prevState, column]));
  };

  const addTasks = (task: ItemsFromBackendProps) => {
    setTasks((prevState) => ([...prevState, task]));
  };

  const addUsers = (user: Users) => {
    setUsers((prevState) => ([...prevState, user]));
  };

  const justiceTaskManagerContextValue = useMemo(() => ({
    boards,
    columns,
    tasks,
    users,
    addBoards,
    addColumns,
    addTasks,
    addUsers,
  }), [boards, columns, tasks, users]);

  return (
    <JusticeTaskManagerContext.Provider value={justiceTaskManagerContextValue}>
      {children}
    </JusticeTaskManagerContext.Provider>
  );
};
