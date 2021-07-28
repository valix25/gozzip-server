const postsResolvers = require("./posts");
const usersResolvers = require("./users");

/*
Practically speaking, the GraphQL layer lives between the client and one or more data sources, 
receiving client requests and fetching the necessary data according to your instructions */

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
