import { gql } from 'apollo-server-express';

export const typeDefs = gql`
scalar JSON
    type Query {
        getUsers: User
    }
    type Mutation {
        register(firstName: String!, lastName:String!, email: String!, password: String!): User
        login(email: String!, password: String!): Token
    }
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }
    type Token {
        User: User
        token: String!
    }
    type Board {
        id: ID!
        name: String!
        users: [ID!]
        rootUser: User!
    }
    type Task {
        id: ID!
        content: String!
        columnId: ID!
    }
    type Column {
        id: ID!
        name: String!
        boardId: ID!
        items: [Task]
    }
`;
