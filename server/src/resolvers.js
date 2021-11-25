const resolvers = {
  Mutation: {
    postArticle: (_, { post }, { dataSources }) => {
      const { title, content } = post;
      if (!title || !title.length || !content || !content.length) {
        throw new Error('improper parameters');
      }

      return dataSources.article.addArticle(post)
        .then((id) => ({ id, title, content }));
    },
  },
  Query: {
    articles: (_, { pageSize, after }, { dataSources }) => {
      if (pageSize === null || after === null || pageSize <= 0) {
        throw new Error('improper parameters');
      }

      const all = dataSources.article.listArticles()
        .sort((a, b) => (a.id > b.id ? -1 : 1));
      const index = after && after.length ? all.findIndex((a) => a.id < after) : 0;

      const articles = index < 0 ? [] : all.slice(index, index + pageSize);
      if (articles.length > 0) {
        return {
          cursor: articles[articles.length - 1].id,
          hasMore: articles[articles.length - 1].id !== all[all.length - 1].id,
          articles,
        };
      }

      return { cursor: '', hasMore: false, articles };
    },
    article: (_, { id }, { dataSources }) => {
      const article = dataSources.article.getArticle(id);
      if (!article || !article.length) {
        throw new Error('article not found');
      }
      return article[0];
    },
  },
};

module.exports = resolvers;
