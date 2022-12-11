import { gql } from 'apollo-server-express';

export const typeDefs = gql`
scalar JSON
    type Query {
        getUsers: [User]
        getBoard(id: String!): Board
        getAllBoard: [Board]
    }
    type Mutation {
        register(firstName: String!, lastName:String!, email: String!, password: String!): User
        login(email: String!, password: String!): Token
        updateBoard(Board: BoardInput!): Board
        createColumn(name: String!, boardId: String!): Board
        createBoard(name: String!, users: [String]!, rootUser: String!): Board
    }
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
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
        columns: [Column]
    }
    type Task {
        id: ID!
        content: String!
        columnId: String!
    }
    type Column {
        id: ID!
        name: String!
        boardId: String!
        tasks: [Task]
    }
    input TaskInput {
        id: ID!
        content: String!
        columnId: String!
    }
    input ColumnInput {
        id: ID!
        name: String!
        boardId: String!
        tasks: [TaskInput]
    }
    input BoardInput {
        id: ID!
        name: String!
        users: [String]!
        rootUser: String!
        columns: [ColumnInput]
    }
`;
