import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import { CloseButton } from '../CloseButton';
import { Board } from '../../types';

import { useJusticeBoardCards } from './useJusticeBoardCard';
import styles from './styles.module.scss';

interface JusticeBoardCardProps {
  board: Board
}

export const JusticeBoardCard: FC<JusticeBoardCardProps> = ({ board }) => {
  const {
    id, name, rootUser,
  } = board;

  const {
    handleNavigateToBoard, handleRemoveBoard, checkPermission, User,
  } = useJusticeBoardCards(id, board);

  return (
    <Card className={styles.card} onClick={handleNavigateToBoard}>
      {rootUser === User?.id && <CloseButton removeFunction={(event) => handleRemoveBoard(event)} />}
      {!checkPermission && <LockIcon className={styles.lockBoard} />}
      <CardContent>
        <Typography>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};
