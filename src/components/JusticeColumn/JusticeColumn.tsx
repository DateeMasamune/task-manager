import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { JusticeTaskCard } from '../JusticeTaskCard';
import { ItemsFromBackendProps } from '../JusticeBoard';

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
            sx={{
              background: spanshotCol.draggingOver ? 'white' : 'lightgray',
              padding: '0 20px 0',
              width: '250px',
              flexShrink: 0,
              margin: '0 10px',
              boxShadow: '-14px -4px 20px -9px rgba(34, 60, 80, 0.47)',
            }}
          >
            <Box sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h4">{name}</Typography>
            </Box>
            <Droppable droppableId={id} key={id}>
              {(providedTask) => (
                <Box
                  ref={providedTask.innerRef}
                  {...providedTask.droppableProps}
                  {...providedTask.innerRef}
                  sx={{
                    height: '74vh', overflow: 'auto', '&::-webkit-scrollbar': { width: '5px', backgroundColor: 'black' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'white' },
                  }}
                >
                  <JusticeTaskCard items={items} />
                  {providedTask.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        )}
      </Draggable>
    ))}
  </>

);
