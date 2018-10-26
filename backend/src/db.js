/**
 * Connect to remote prisma DB
 */

const { Prisma } = require('prisma-binding');


const db = new Prisma({
  typeDef: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: prorcess.env.PRISMA_SECRET,
  debug: true
});

module.exports = db;

