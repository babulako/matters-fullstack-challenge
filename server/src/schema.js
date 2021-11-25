const { gql } = require('apollo-server');

const schema = gql`
type Article {
  id: ID!
  title: String!
  content: String!
}

input Post {
  title: String!
  content: String!
}

type Mutation {
  postArticle(post: Post): Article
}

type Query {
  articles: [Article]
}
`;

module.exports = schema;
