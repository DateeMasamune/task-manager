import { DragActionsProps } from './dragTaskOutSideColumns';

export const dragTasksInsideColumns = ({
  sourceColumn,
  source,
  destination,
  paramId,
  currentBoard,
  mutationUpdateBoard,
}: DragActionsProps) => {
  if (!currentBoard || !sourceColumn) return;

  const swapPlaces = [...sourceColumn.tasks];
  const [removed] = swapPlaces.splice(source.index, 1);
  swapPlaces.splice(destination.index, 0, removed);

  const updatePositionTaskColumns = currentBoard.columns.filter((col) => col).map((item) => {
    if (item.id === sourceColumn.id) {
      return {
        ...sourceColumn,
        tasks: swapPlaces,
      };
    }

    return item;
  });

  if (paramId) {
    mutationUpdateBoard(updatePositionTaskColumns);
  }
};
