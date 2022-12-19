/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
};

export type Token = {
  __typename: "Token",
  User: User,
  token: string,
};

export type BoardInput = {
  id: string,
  name: string,
  users: Array< string | null >,
  rootUser: string,
  columns: Array< ColumnInput | null >,
};

export type ColumnInput = {
  id: string,
  customId: string,
  name: string,
  boardId: string,
  tasks: Array< TaskInput | null >,
};

export type TaskInput = {
  id: string,
  content: string,
  columnId: string,
};

export type Board = {
  __typename: "Board",
  id: string,
  name: string,
  users: Array< string | null >,
  rootUser: string,
  columns:  Array<Column | null >,
};

export type Column = {
  __typename: "Column",
  id: string,
  customId: string,
  name: string,
  boardId: string,
  tasks:  Array<Task | null >,
};

export type Task = {
  __typename: "Task",
  id: string,
  content: string,
  columnId: string,
};

export type RegisterMutationVariables = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
};

export type RegisterMutation = {
  register?:  {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  } | null,
};

export type LoginMutationVariables = {
  email: string,
  password: string,
};

export type LoginMutation = {
  login?:  {
    __typename: "Token",
    User:  {
      __typename: "User",
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    },
    token: string,
  } | null,
};

export type UpdateBoardMutationVariables = {
  Board: BoardInput,
};

export type UpdateBoardMutation = {
  updateBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    users: Array< string | null >,
    rootUser: string,
    columns:  Array< {
      __typename: "Column",
      id: string,
      customId: string,
      name: string,
      boardId: string,
      tasks:  Array< {
        __typename: "Task",
        id: string,
        content: string,
        columnId: string,
      } | null >,
    } | null >,
  } | null,
};

export type CreateBoardMutationVariables = {
  name: string,
  users: Array< string | null >,
  rootUser: string,
  columns: Array< ColumnInput | null >,
};

export type CreateBoardMutation = {
  createBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    users: Array< string | null >,
    rootUser: string,
    columns:  Array< {
      __typename: "Column",
      id: string,
      customId: string,
      name: string,
      boardId: string,
      tasks:  Array< {
        __typename: "Task",
        id: string,
        content: string,
        columnId: string,
      } | null >,
    } | null >,
  } | null,
};

export type RemoveBoardMutationVariables = {
  id: string,
};

export type RemoveBoardMutation = {
  removeBoard?: string | null,
};

export type AddUserForBoardMutationVariables = {
  id: string,
  users: Array< string | null >,
};

export type AddUserForBoardMutation = {
  addUserForBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    users: Array< string | null >,
    rootUser: string,
    columns:  Array< {
      __typename: "Column",
      id: string,
      customId: string,
      name: string,
      boardId: string,
      tasks:  Array< {
        __typename: "Task",
        id: string,
        content: string,
        columnId: string,
      } | null >,
    } | null >,
  } | null,
};

export type GetUsersQuery = {
  getUsers?:  Array< {
    __typename: "User",
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  } | null > | null,
};

export type GetAllBoardQuery = {
  getAllBoard?:  Array< {
    __typename: "Board",
    id: string,
    name: string,
    users: Array< string | null >,
    rootUser: string,
    columns:  Array< {
      __typename: "Column",
      id: string,
      customId: string,
      name: string,
      boardId: string,
      tasks:  Array< {
        __typename: "Task",
        id: string,
        content: string,
        columnId: string,
      } | null >,
    } | null >,
  } | null > | null,
};

export type SocketBoardRemoveSubscription = {
  socketBoardRemove?: string | null,
};

export type SocketBoardCreateSubscription = {
  socketBoardCreate?:  {
    __typename: "Board",
    id: string,
    name: string,
    users: Array< string | null >,
    rootUser: string,
    columns:  Array< {
      __typename: "Column",
      id: string,
      customId: string,
      name: string,
      boardId: string,
      tasks:  Array< {
        __typename: "Task",
        id: string,
        content: string,
        columnId: string,
      } | null >,
    } | null >,
  } | null,
};

export type SocketBoardUpdateSubscriptionVariables = {
  rootUser: string,
};

export type SocketBoardUpdateSubscription = {
  socketBoardUpdate?:  {
    __typename: "Board",
    id: string,
    name: string,
    users: Array< string | null >,
    rootUser: string,
    columns:  Array< {
      __typename: "Column",
      id: string,
      customId: string,
      name: string,
      boardId: string,
      tasks:  Array< {
        __typename: "Task",
        id: string,
        content: string,
        columnId: string,
      } | null >,
    } | null >,
  } | null,
};

export type SocketAddUserForBoardSubscriptionVariables = {
  rootUser: string,
};

export type SocketAddUserForBoardSubscription = {
  socketAddUserForBoard?:  {
    __typename: "Board",
    id: string,
    name: string,
    users: Array< string | null >,
    rootUser: string,
    columns:  Array< {
      __typename: "Column",
      id: string,
      customId: string,
      name: string,
      boardId: string,
      tasks:  Array< {
        __typename: "Task",
        id: string,
        content: string,
        columnId: string,
      } | null >,
    } | null >,
  } | null,
};
