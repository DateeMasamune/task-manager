import React, {
  createContext, FC, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';

import soundNotification from '../../assets/notifications/notification.mp3';

export interface MySnackbarOrigin extends SnackbarOrigin {
  open: boolean;
  message: string
  type: 'error' | 'notification'
}

interface SnackbarContextProps {
  handleCloseSnackbar: () => void
  addSnackbar: (message: string, type?: 'error' | 'notification') => void
}

interface SnackbarContextProviderProps {
  children: ReactNode
}

export const SnackbarContext = createContext<SnackbarContextProps>({} as SnackbarContextProps);

export const SnackbarContextProvider: FC<SnackbarContextProviderProps> = ({ children }) => {
  const [stateSnackbar, setStateSnackbar] = useState<MySnackbarOrigin>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    type: 'notification',
  });

  const {
    vertical, horizontal, open, message, type,
  } = stateSnackbar;

  const handleCloseSnackbar = () => setStateSnackbar((prevState) => ({ ...prevState, open: false }));

  const addSnackbar = (message: string, type: 'error' | 'notification' = 'error') => {
    setStateSnackbar((prevState) => ({
      ...prevState, open: true, type, message,
    }));
  };

  const SnackbarContextProviderValue = useMemo(() => ({
    handleCloseSnackbar,
    addSnackbar,
  }), [stateSnackbar]);

  useEffect(() => {
    if (open) {
      const audio = new Audio(soundNotification);
      audio.play();
    }
  }, [stateSnackbar]);

  return (
    <SnackbarContext.Provider value={SnackbarContextProviderValue}>
      <>
        {children}
        {type === 'notification'
          ? (
            <Snackbar
              anchorOrigin={stateSnackbar}
              open={open}
              onClose={handleCloseSnackbar}
              message={message}
              key={message + vertical + horizontal}
              autoHideDuration={null}
            />
          )
          : (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          )}
      </>
    </SnackbarContext.Provider>
  );
};
