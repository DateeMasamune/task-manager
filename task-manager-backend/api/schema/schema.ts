import { gql } from 'apollo-server-express';

export const typeDefs = gql`
scalar JSON
    type Query {
        getUsers: [User]
        getAllBoard: [Board]
    }
    type Mutation {
        register(firstName: String!, lastName:String!, email: String!, password: String!): User
        login(email: String!, password: String!): Token
        updateBoard(Board: BoardInput!): Board
        createBoard(name: String!, users: [String]!, rootUser: String!, columns: [ColumnInput]!): Board
        removeBoard(id: ID!): ID
        addUserForBoard(id: ID!, users: [String]!): Board
    }
    type Subscription {
        socketBoardUpdate: Board
        socketBoardRemove: ID
        socketBoardCreate: Board
        socketAddUserForBoard(rootUser: ID!): Board
    }
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }
    type ID {
        id: ID!
    }
    type Token {
        User: User!
        token: String!
    }
    type Board {
        id: ID!
        name: String!
        users: [String]!
        rootUser: String!
        columns: [Column]!
    }
    type Column {
        id: ID!
        customId: String!
        name: String!
        boardId: String!
        tasks: [Task]!
    }
    type Task {
        id: ID!
        content: String!
        columnId: String!
    }
    input TaskInput {
        id: ID!
        content: String!
        columnId: String!
    }
    input ColumnInput {
        id: ID!
        customId: String!
        name: String!
        boardId: String!
        tasks: [TaskInput]!
    }
    input BoardInput {
        id: ID!
        name: String!
        users: [String]!
        rootUser: String!
        columns: [ColumnInput]!
    }
`;
