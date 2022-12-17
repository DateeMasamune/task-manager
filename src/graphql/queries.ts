/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import { gql } from "@apollo/client";

export const getUsers = /* GraphQL */ gql`
  query GetUsers {
    getUsers {
      id
      firstName
      lastName
      email
      password
    }
  }
`;
export const getAllBoard = /* GraphQL */ gql`
  query GetAllBoard {
    getAllBoard {
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
