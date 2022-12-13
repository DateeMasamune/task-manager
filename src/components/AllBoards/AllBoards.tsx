import React, { useContext, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styles from './styles.module.scss';
import { routes } from '../../constants';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { CloseButton } from '../CloseButton';
import { removeBoard } from '../../graphql/mutations';
import { RemoveBoardMutationVariables } from '../../API';
import { SnackbarContext } from '../SnackbarContext';

const { AllBOARDS } = routes;

export const AllBoards = () => {
  const navigation = useNavigate();
  const { boards } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);

  const [removeBoardReq, { error: errorRemoveBoard }] = useMutation<string, RemoveBoardMutationVariables>(removeBoard);

  const handleRemoveBoard = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    removeBoardReq({
      variables: {
        id,
      },
    });
  };

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
    <Box className={styles.wrapperAllBoards}>
      {boards.map(({ id, name }) => (
        <Card key={id} className={styles.card} onClick={() => navigation(`${AllBOARDS}/${id}`)}>
          <CloseButton removeFunction={(event) => handleRemoveBoard(event, id)} />
          <CardContent>
            <Typography>
              {name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
