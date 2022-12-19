/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import { gql } from "@apollo/client";

export const socketBoardRemove = /* GraphQL */ gql`
  subscription SocketBoardRemove {
    socketBoardRemove
  }
`;
export const socketBoardCreate = /* GraphQL */ gql`
  subscription SocketBoardCreate {
    socketBoardCreate {
      id
      name
      users
      rootUser
      columns {
        id
        customId
        name
        boardId
        tasks {
          id
          content
          columnId
        }
      }
    }
  }
`;
export const socketBoardUpdate = /* GraphQL */ gql`
  subscription SocketBoardUpdate($rootUser: ID!) {
    socketBoardUpdate(rootUser: $rootUser) {
      id
      name
      users
      rootUser
      columns {
        id
        customId
        name
        boardId
        tasks {
          id
          content
          columnId
        }
      }
    }
  }
`;
export const socketAddUserForBoard = /* GraphQL */ gql`
  subscription SocketAddUserForBoard($rootUser: ID!) {
    socketAddUserForBoard(rootUser: $rootUser) {
      id
      name
      users
      rootUser
      columns {
        id
        customId
        name
        boardId
        tasks {
          id
          content
          columnId
        }
      }
    }
  }
`;
