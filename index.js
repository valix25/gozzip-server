// Apollo Server is an open-source, spec-compliant GraphQL server.
// It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.
const { ApolloServer } = require("apollo-server");
// mongoose ORM wrapper which let's us interface with the MongoDB database
const mongoose = require("mongoose");

// import local mongo credentials
const { MONGODB } = require("./config.js");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// connect to the MongoDB database
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // when connected to MongoDB start the server
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
