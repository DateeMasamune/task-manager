import React, {
  createContext, FC, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { boardsMock, columsFromBackendMock, usersMock } from '../../mock';
import {
  Board, Column, FrontendMappingColumn, Task, User,
} from '../../types';

interface JusticeTaskManagerContextProps {
  boards: Board[]
  columns: FrontendMappingColumn
  tasks: Task[]
  users: User[]
  // eslint-disable-next-line no-unused-vars
  addBoards: (board: Board) => void
  // eslint-disable-next-line no-unused-vars
  addColumns: (column: Column) => void
  // eslint-disable-next-line no-unused-vars
  addTasks: (task: Task, idBoard: string | null) => void
  // eslint-disable-next-line no-unused-vars
  addUsers: (user: User) => void
}

interface JusticeTaskManagerContextProviderProps {
  children: ReactNode
}

export const JusticeTaskManagerContext = createContext<JusticeTaskManagerContextProps>({} as JusticeTaskManagerContextProps);

export const JusticeTaskManagerContextProvider: FC<JusticeTaskManagerContextProviderProps> = ({ children }) => {
  const [columnsFromBackend] = useState<Column[]>(columsFromBackendMock);

  const [boards, setBoards] = useState<Board[]>(boardsMock);
  const [columns, setColumns] = useState<FrontendMappingColumn>({});
  const [tasks, setTasks] = useState<Task[]>([]); // TODO возможно придется отказаться
  const [users, setUsers] = useState<User[]>(usersMock);

  const addBoards = (board: Board) => {
    setBoards((prevState) => ([...prevState, board]));
  };

  const addColumns = (column: Column) => {
    setColumns((prevState) => ({
      ...prevState,
      [column.boardId]: prevState[column.boardId] ? [...prevState[column.boardId], column] : [column],
    }));
  };

  const addTasks = (task: Task, idBoard: string | null) => {
    if (!idBoard) return;

    const newTask = columns[idBoard].find(({ id }) => id === task.columnId);
    newTask?.items.push(task);

    setTasks((prevState) => ([...prevState, task]));

    setColumns((prevState) => ({
      ...prevState,
      [idBoard]: prevState[idBoard].map((column) => {
        if (column.id === newTask?.id) {
          return newTask;
        }
        return column;
      }),
    }));
  };

  const addUsers = (user: User) => {
    setUsers((prevState) => ([...prevState, user]));
  };

  const test = () => {
    const struct: FrontendMappingColumn = {};
    columnsFromBackend.forEach((column) => {
      struct[column?.boardId] = struct[column?.boardId] ? [...struct[column?.boardId], column] : [column];
    });
    console.log('struct', struct);
    setColumns(struct);
  };

  useEffect(() => {
    test();
  }, [columnsFromBackend]);

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
