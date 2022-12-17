/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import { gql } from "@apollo/client";

export const register = /* GraphQL */ gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;
export const login = /* GraphQL */ gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      User {
        id
        firstName
        lastName
        email
        password
      }
      token
    }
  }
`;
export const updateBoard = /* GraphQL */ gql`
  mutation UpdateBoard($Board: BoardInput!) {
    updateBoard(Board: $Board) {
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
export const createBoard = /* GraphQL */ gql`
  mutation CreateBoard(
    $name: String!
    $users: [String]!
    $rootUser: String!
    $columns: [ColumnInput]!
  ) {
    createBoard(
      name: $name
      users: $users
      rootUser: $rootUser
      columns: $columns
    ) {
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
export const removeBoard = /* GraphQL */ gql`
  mutation RemoveBoard($id: ID!) {
    removeBoard(id: $id)
  }
`;
export const addUserForBoard = /* GraphQL */ gql`
  mutation AddUserForBoard($id: ID!, $users: [String]!) {
    addUserForBoard(id: $id, users: $users) {
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
