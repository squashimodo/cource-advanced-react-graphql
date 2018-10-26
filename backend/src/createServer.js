const { GraphQLServer } = require('graphql-yoga');
const MutationResolver = require('./resolvers/Mutation.js');
const QueryResolver = require('./resolvers/Query.js');
const db = require('./db.js');

function createServer() {
  return new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
      Mutation: MutationResolver,
      Query: QueryResolver
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({...req, db}),
  });
}

module.exports = createServer;