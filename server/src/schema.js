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

type ArticlePage {
  cursor: String!
  hasMore: Boolean!
  articles: [Article]!
}

type Query {
  articles(pageSize: Int, after: String): ArticlePage
  article(id: String): Article
}
`;

module.exports = schema;
