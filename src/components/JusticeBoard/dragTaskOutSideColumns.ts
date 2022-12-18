import { DraggableLocation } from 'react-beautiful-dnd';
import { Board, Column } from '../../types';

export interface DragActionsProps {
  sourceColumn?: Column
  destColumn?: Column
  source: DraggableLocation
  destination: DraggableLocation
  currentBoard?: Board
  paramId: string | undefined
  mutationUpdateBoard: (column: Column[]) => void
}

export const dragTaskOutSideColumns = ({
  sourceColumn,
  destColumn,
  source,
  destination,
  currentBoard,
  paramId,
  mutationUpdateBoard,
}: DragActionsProps) => {
  if (!destColumn || !currentBoard || !sourceColumn) return;

  const swapSourceItems = [...sourceColumn.tasks];
  const swapDestinationItems = [...destColumn.tasks];

  const [removedTaskFromColumn] = swapSourceItems.splice(source.index, 1);
  swapDestinationItems.splice(destination.index, 0, removedTaskFromColumn);

  const columnDestination = currentBoard.columns.filter((col) => col).find(({ id }) => String(id) === destination.droppableId);
  const columnSource = currentBoard.columns.filter((col) => col).find(({ id }) => String(id) === source.droppableId);

  if (columnDestination && columnSource) {
    const updatePositionTaskColumns = currentBoard.columns.filter((col) => col).map((item) => {
      if (item.id === columnDestination.id) {
        return {
          ...columnDestination,
          tasks: swapDestinationItems,
        };
      }

      if (item.id === columnSource.id) {
        return {
          ...columnSource,
          tasks: swapSourceItems,
        };
      }

      return item;
    });

    if (paramId) {
      mutationUpdateBoard(updatePositionTaskColumns);
    }
  }
};
