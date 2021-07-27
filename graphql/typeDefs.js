// can be imported from apollo-server because graphql-tag is a subdependency
const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    sayHi: String!
    getPosts: [Post]
  }
`;
