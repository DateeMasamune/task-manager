import React from 'react';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { routes } from '../../constants';
import { boards } from '../../mock';

const { AllBOARDS } = routes;

export const AllBoards = () => {
  const navigation = useNavigate();

  return (
    <Box className={styles.wrapperAllBoards}>
      {boards.map(({ id, name }) => (
        <Card key={id} className={styles.card} onClick={() => navigation(`${AllBOARDS}/id`)}>
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
