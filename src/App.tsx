import React, { useId, useState } from 'react';
import { Box } from '@mui/material';
import {
  DragDropContext, Droppable, Draggable, DropResult,
} from 'react-beautiful-dnd';

interface ItemsFromBackendProps {
  id: string
  content: string
}

interface ColumsFromBackendProps {
  id: string
  name: string
  items: ItemsFromBackendProps[]
}

function App() {
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

  const columsFromBackend: ColumsFromBackendProps[] = [
    {
      id: useId(),
      name: 'Todo',
      items: itemsFromBackend,
    },
  ];

  const [columns, setColumns] = useState<ColumsFromBackendProps[]>(columsFromBackend);
  console.log(columns);

  const handlerOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const column = columns.find(({ id }) => id === source.droppableId);
    if (column) {
      const swapPlaces = [...column.items];
      [swapPlaces[source.index], swapPlaces[destination.index]] = [swapPlaces[destination.index], swapPlaces[source.index]];

      const updateColumns = columns.map((item) => {
        if (item.id === column.id) {
          return {
            ...column,
            items: swapPlaces,
          };
        }

        return item;
      });

      setColumns(updateColumns);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDragEnd={handlerOnDragEnd}>
        {columns.map(({ id, items }) => (
          <Droppable droppableId={id} key={id}>
            {(providedCol, snapshotCol) => (
              <Box
                ref={providedCol.innerRef}
                {...providedCol.droppableProps}
                {...providedCol.innerRef}
                sx={{
                  background: snapshotCol.isDraggingOver ? 'lightblue' : 'lightgray', padding: 4, width: 250, minHeight: '91vh',
                }}
              >
                {items.map(({ id: itemId, content }, index) => (
                  <Draggable
                    key={itemId}
                    draggableId={itemId}
                    index={index}
                  >
                    {(providedItem, snapshotItem) => (
                      <Box
                        ref={providedItem.innerRef}
                        {...providedItem.draggableProps}
                        {...providedItem.dragHandleProps}
                        sx={{
                          userSelect: 'none',
                          margin: '0 0 8px 0',
                          minHeight: '50px',
                          backgroundColor: snapshotItem.isDragging ? '#263B4A' : '#456C86',
                          color: 'white',
                          ...providedItem.draggableProps.style,
                        }}
                      >
                        {content}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {providedCol.placeholder}
              </Box>
            )}
          </Droppable>
        ))}

      </DragDropContext>
    </Box>
  );
}

export default App;
