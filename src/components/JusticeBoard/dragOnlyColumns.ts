import { DragActionsProps } from './dragTaskOutSideColumns';

export const dragOnlyColumns = ({
  currentBoard,
  source,
  destination,
  paramId,
  mutationUpdateBoard,
}: DragActionsProps) => {
  if (!currentBoard) return;

  const dragColumn = [...currentBoard.columns];

  const [removedColumn] = dragColumn.splice(source.index, 1);
  dragColumn.splice(destination.index, 0, removedColumn);

  if (paramId) {
    mutationUpdateBoard(dragColumn);
  }
};
