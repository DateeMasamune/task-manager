import React, { useContext } from 'react';
import {
  Box,
} from '@mui/material';
import styles from './styles.module.scss';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { JusticeBoardCard } from '../JusticeBoardCard';

export const AllBoards = () => {
  const { boards } = useContext(JusticeTaskManagerContext);

  return (
    <Box className={styles.wrapperAllBoards}>
      {boards.map((board) => (
        <JusticeBoardCard key={board.id} board={board} />
      ))}
    </Box>
  );
};
