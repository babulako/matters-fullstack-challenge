const { ApolloServer } = require('apollo-server');
const initDB = require('./db');
const resolvers = require('./resolvers');
const schema = require('./schema');
const sources = require('./sources');

const initServer = (db) => (
  new ApolloServer({
    cors: {
      origin: ['http://localhost:8000'],
    },
    dataSources: () => ({ article: new sources.ArticleSource(db) }),
    typeDefs: schema,
    debug: true,
    resolvers,
  })
);

const start = () => {
  initDB()
    .then(initServer)
    .then((server) => server.listen({ port: 4000 }))
    .then(({ url }) => {
      console.info(`Server is ready at ${url}`); // eslint-disable-line
    });
};

start();
