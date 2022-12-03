import React, { useId, useState } from 'react';
import { Box } from '@mui/material';
import {
  DragDropContext, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { JusticeColumns } from '../JusticeColumn';

export interface ItemsFromBackendProps {
  id: string
  content: string
}

interface ColumsFromBackendProps {
  id: string
  name: string
  items: ItemsFromBackendProps[]
}

export const JusticeBoard = () => {
  const itemsFromBackend: ItemsFromBackendProps[] = [
    {
      id: useId(),
      content: 'First task',
    },
    {
      id: useId(),
      content: 'Second task',
    },
  ];

  const itemsTwoFromBackend: ItemsFromBackendProps[] = [
    {
      id: useId(),
      content: 'Three task',
    },
    {
      id: useId(),
      content: 'Four task',
    },
  ];

  const itemsThreeFromBackend: ItemsFromBackendProps[] = [
    {
      id: useId(),
      content: 'Five task',
    },
    {
      id: useId(),
      content: 'Six task',
    },
  ];

  const columsFromBackend: ColumsFromBackendProps[] = [
    {
      id: useId(),
      name: 'Todo',
      items: itemsFromBackend,
    },
    {
      id: useId(),
      name: 'In progress',
      items: itemsTwoFromBackend,
    },
    {
      id: useId(),
      name: 'Ready',
      items: itemsThreeFromBackend,
    },
  ];

  const [columns, setColumns] = useState<ColumsFromBackendProps[]>(columsFromBackend);

  const handlerOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns.find(({ id }) => id === source.droppableId);
    const destColumn = columns.find(({ id }) => id === destination.droppableId);

    const dragColumn = [...columns];

    const [removedColumn] = dragColumn.splice(source.index, 1);
    dragColumn.splice(destination.index, 0, removedColumn);

    setColumns(dragColumn);

    if (source.droppableId !== destination.droppableId) {
      if (sourceColumn && destColumn) {
        const swapSourceItems = [...sourceColumn.items];
        const swapDestinationItems = [...destColumn.items];

        const [removedTaskFromColumn] = swapSourceItems.splice(source.index, 1);
        swapDestinationItems.splice(destination.index, 0, removedTaskFromColumn);

        const columnDestination = columns.find(({ id }) => id === destination.droppableId);
        const columnSource = columns.find(({ id }) => id === source.droppableId);

        if (columnDestination && columnSource) {
          const updateColumns = columns.map((item) => {
            if (item.id === columnDestination.id) {
              return {
                ...columnDestination,
                items: swapDestinationItems,
              };
            }

            if (item.id === columnSource.id) {
              return {
                ...columnSource,
                items: swapSourceItems,
              };
            }

            return item;
          });

          setColumns(updateColumns);
        }
      }
    } else if (sourceColumn) {
      const swapPlaces = [...sourceColumn.items];
      const [removed] = swapPlaces.splice(source.index, 1);
      swapPlaces.splice(destination.index, 0, removed);

      const updateColumns = columns.map((item) => {
        if (item.id === sourceColumn.id) {
          return {
            ...sourceColumn,
            items: swapPlaces,
          };
        }

        return item;
      });

      setColumns(updateColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={handlerOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            sx={{
              display: 'flex', width: '100%', height: '100%',
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <JusticeColumns columns={columns} />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
