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
        createColumn(name: String!, boardId: String!, tasks: [TaskInput]!): Board
        createBoard(name: String!, users: [String]!, rootUser: String!, columns: [ColumnInput]!): Board
    }
    type Subscription {
        socketBoardUpdate: Board
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
