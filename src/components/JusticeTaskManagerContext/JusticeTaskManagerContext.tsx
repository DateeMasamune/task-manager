import React, {
  createContext, FC, ReactNode, useMemo, useState,
} from 'react';
import { boardsMock } from '../../mock';
import { Board } from '../../types';

interface JusticeTaskManagerContextProps {
  boards: Board[]
  // eslint-disable-next-line no-unused-vars
  addBoards: (brd: Board) => void
}

interface JusticeTaskManagerContextProviderProps {
  children: ReactNode
}

export const JusticeTaskManagerContext = createContext<JusticeTaskManagerContextProps>({} as JusticeTaskManagerContextProps);

export const JusticeTaskManagerContextProvider: FC<JusticeTaskManagerContextProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>(boardsMock);

  const addBoards = (brd: Board) => {
    setBoards((prevState) => ([...prevState, brd]));
  };

  const justiceTaskManagerContextValue = useMemo(() => ({
    boards,
    addBoards,
  }), [boards]);

  console.log(justiceTaskManagerContextValue);

  return (
    <JusticeTaskManagerContext.Provider value={justiceTaskManagerContextValue}>
      {children}
    </JusticeTaskManagerContext.Provider>
  );
};
