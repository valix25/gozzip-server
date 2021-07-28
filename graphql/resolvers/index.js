const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

/*
Practically speaking, the GraphQL layer lives between the client and one or more data sources, 
receiving client requests and fetching the necessary data according to your instructions */

module.exports = {
  // maybe called 'modifiers'
  // name of the type, each time that any query or mutation returns a Post will go through this Post modifier
  // and apply these modifications
  Post: {
    // parent related to the queries / modifications return value
    likeCount(parent) {
      // console.log(parent);
      return parent.likes.length;
    },
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
