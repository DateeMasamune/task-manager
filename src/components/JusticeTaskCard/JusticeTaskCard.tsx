import { Card, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ItemsFromBackendProps } from '../JusticeBoard';

interface JusticeTaskCardProps {
  items: ItemsFromBackendProps[]
}

export const JusticeTaskCard: FC<JusticeTaskCardProps> = ({ items }) => (
  <>
    {items.map(({ id: itemId, content }, index) => (
      <Draggable
        key={itemId}
        draggableId={itemId}
        index={index}
      >
        {(providedItem, snapshotItem) => (
          <Card
            ref={providedItem.innerRef}
            {...providedItem.draggableProps}
            {...providedItem.dragHandleProps}
            sx={{
              userSelect: 'none',
              margin: '0 0 8px 0',
              minHeight: '50px',
              backgroundColor: snapshotItem.isDragging ? '#444444' : '#000000',
              color: 'white',
              ...providedItem.draggableProps.style,
              boxShadow: '-4px 28px 42px 6px rgba(34, 60, 80, 0.37)',
            }}
          >
            <CardContent>
              <Typography>
                {content}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Draggable>
    ))}
  </>
);
