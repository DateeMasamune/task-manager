import { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RemoveBoardMutationVariables } from '../../API';
import { routes } from '../../constants';
import { removeBoard } from '../../graphql/mutations';
import { Board } from '../../types';
import { checkPermissionForBoard } from '../../utils/checkPermissionForBoard';
import { myUser } from '../../utils/myUser';
import { SnackbarContext } from '../SnackbarContext';

const { AllBOARDS } = routes;

export const useJusticeBoardCards = (id: string, board: Board) => {
  const { User } = myUser();

  const navigation = useNavigate();

  const { addSnackbar } = useContext(SnackbarContext);

  const [removeBoardReq, { error: errorRemoveBoard }] = useMutation<string, RemoveBoardMutationVariables>(removeBoard);

  const checkPermission = User && checkPermissionForBoard(board, User.id);

  const handleRemoveBoard = (event: MouseEvent) => {
    event.stopPropagation();
    removeBoardReq({
      variables: {
        id,
      },
    });
  };

  const handleNavigateToBoard = () => (checkPermission ? navigation(`${AllBOARDS}/${id}`) : navigation('/'));

  useEffect(() => {
    if (errorRemoveBoard) {
      addSnackbar(errorRemoveBoard.message);
    }
  }, [errorRemoveBoard]);

  return {
    handleNavigateToBoard, handleRemoveBoard, checkPermission, User,
  };
};
