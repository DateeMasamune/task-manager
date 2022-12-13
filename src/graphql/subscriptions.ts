/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import { gql } from "@apollo/client";

export const socketBoardUpdate = /* GraphQL */ gql`
  subscription SocketBoardUpdate {
    socketBoardUpdate {
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
