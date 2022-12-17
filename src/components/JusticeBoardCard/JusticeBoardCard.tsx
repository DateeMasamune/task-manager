import React, { FC, useContext, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { CloseButton } from '../CloseButton';
import { RemoveBoardMutationVariables } from '../../API';
import { removeBoard } from '../../graphql/mutations';
import { myUser } from '../../utils/myUser';
import { SnackbarContext } from '../SnackbarContext';
import { routes } from '../../constants';
import { checkPermissionForBoard } from '../../utils/checkPermissionForBoard';
import { Board } from '../../types';

import styles from './styles.module.scss';

interface JusticeBoardCardProps {
  board: Board
}

const { AllBOARDS } = routes;

export const JusticeBoardCard: FC<JusticeBoardCardProps> = ({ board }) => {
  const {
    id, name, rootUser,
  } = board;
  const { User } = myUser();

  const navigation = useNavigate();

  const { addSnackbar } = useContext(SnackbarContext);

  const [removeBoardReq, { error: errorRemoveBoard }] = useMutation<string, RemoveBoardMutationVariables>(removeBoard);

  const checkPermission = User && checkPermissionForBoard(board, User.id);

  const handleRemoveBoard = (event: MouseEvent) => {
    event.stopPropagation();
    removeBoardReq({
      variables: {
        id,
      },
    });
  };

  const handleNavigateToBoard = () => (checkPermission ? navigation(`${AllBOARDS}/${id}`) : navigation('/'));

  useEffect(() => {
    if (errorRemoveBoard) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: errorRemoveBoard.message,
        type: 'error',
      });
    }
  }, [errorRemoveBoard]);

  return (
    <Card key={id} className={styles.card} onClick={handleNavigateToBoard}>
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
