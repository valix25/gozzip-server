// Apollo Server is an open-source, spec-compliant GraphQL server.
// It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.
const { ApolloServer } = require("apollo-server");

// PubSub not included by default anymore in apollo-werver
// const { PubSub } = require("apollo-server");
// const { PubSub } = require("graphql-subscriptions");

// mongoose ODM wrapper which let's us interface with the MongoDB database
const mongoose = require("mongoose");

// import local mongo credentials
const { MONGODB } = require("./config.js");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

// const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // we get a request and we want to forward that request, with this the request will be forwarded
  // to the context, so now we can access the request body in our context
  context: ({ req }) => ({ req }),
});

// connect to the MongoDB database
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // when connected to MongoDB start the server
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
