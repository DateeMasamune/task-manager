import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { JusticeTaskCardList } from '../JusticeTaskCardList';
import { ItemsFromBackendProps } from '../JusticeBoard';

import styles from './styles.module.scss';

interface ColumsFromBackendProps {
  id: string
  name: string
  items: ItemsFromBackendProps[]
}

interface JusticeColumnsProps {
  columns: ColumsFromBackendProps[]
}

export const JusticeColumns: FC<JusticeColumnsProps> = ({ columns }) => (
  <>
    {columns.map(({ id, items, name }, index) => (
      <Draggable
        key={id}
        draggableId={id}
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
