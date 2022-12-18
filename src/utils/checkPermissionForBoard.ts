import { Board } from '../types';

export const checkPermissionForBoard = (board: Board, myId: string) => board.users.includes(myId) || board.rootUser === myId;
