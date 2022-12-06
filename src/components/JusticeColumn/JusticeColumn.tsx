import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { JusticeTaskCardList } from '../JusticeTaskCardList';

import styles from './styles.module.scss';
import { Column } from '../../types';

interface JusticeColumnsProps {
  columns: Column[]
}

export const JusticeColumns: FC<JusticeColumnsProps> = ({ columns }) => (
  <>
    {columns.map(({ id, items, name }, index) => (
      <Draggable
        key={id}
        draggableId={String(id)}
        index={index}
      >
        {(providedCol, spanshotCol) => (
          <Box
            ref={providedCol.innerRef}
            {...providedCol.draggableProps}
            {...providedCol.dragHandleProps}
            className={styles.wrapperJusticeColumns}
            sx={{
              background: spanshotCol.draggingOver ? 'white' : 'lightgray',
            }}
          >
            <Box sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h4">{name}</Typography>
            </Box>
            <JusticeTaskCardList items={items} id={id} />
          </Box>
        )}
      </Draggable>
    ))}
  </>

);
