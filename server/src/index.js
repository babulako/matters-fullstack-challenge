const { ApolloServer, gql } = require('apollo-server');
const initDB = require('./db');

const initServer = () => (
  new ApolloServer({
    cors: {
      origin: [],
    },
    dataSources: () => ({ }),
    debug: true,
    resolvers: {
      Query: {},
    },
    typeDefs: gql`
      type Article {
        title: String
        content: String
      }
  
      type Query {
        articles: [Article]
      }
    `,
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
