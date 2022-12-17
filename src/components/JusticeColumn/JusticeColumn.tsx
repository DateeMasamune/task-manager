import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { Box, Typography } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import { Draggable } from 'react-beautiful-dnd';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { JusticeTaskCardList } from '../JusticeTaskCardList';
import { Board, Column } from '../../types';
import { ChangeName } from '../ChangeName';
import { UpdateBoardMutationVariables } from '../../API';
import { updateBoard } from '../../graphql/mutations';
import { JusticeTaskManagerContext } from '../JusticeTaskManagerContext';
import { SnackbarContext } from '../SnackbarContext';
import { CloseButton } from '../CloseButton';

import styles from './styles.module.scss';

interface JusticeColumnsProps {
  column: Column
  index: number
}

export const JusticeColumns: FC<JusticeColumnsProps> = ({ column, index }) => {
  const [openChangeName, setOpenChangeName] = useState(false);
  
  const { id: boardId } = useParams();

  const { name, tasks, id } = column;

  const { renameColumn, removeColumn } = useContext(JusticeTaskManagerContext);
  const { addSnackbar } = useContext(SnackbarContext);


  const [updateBoardReq, { error: updateBoardError }] = useMutation<Board, UpdateBoardMutationVariables>(updateBoard);

  const handleChangeNameColumn = (newName: string) => {
    const columnRename = { ...column, name: newName };
    const board = renameColumn(columnRename);

    if (board) {
      updateBoardReq({
        variables: {
          Board: board,
        },
      });
    }

    setOpenChangeName(false);
  };

  const handleRemoveColumn = (event: MouseEvent) => {
    event.stopPropagation();

    if (boardId) {
      const board = removeColumn(column, boardId);

      if (board) {
        updateBoardReq({
          variables: {
            Board: board,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (updateBoardError) {
      addSnackbar({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: updateBoardError.message,
        type: 'error',
      });
    }
  }, [updateBoardError]);

  return (
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
            <Box className={styles.controll} onClick={() => setOpenChangeName(true)}>
              <ModeIcon />
              <CloseButton removeFunction={handleRemoveColumn} />
            </Box>
            {!openChangeName
              ? <Typography variant="h4">{name}</Typography>
              : <ChangeName prevName={name} sendChanges={handleChangeNameColumn} hideChangeName={() => setOpenChangeName(false)} />}
          </Box>
          <JusticeTaskCardList tasks={tasks} id={id} />
        </Box>
      )}
    </Draggable>
  );
};
