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
};

module.exports = resolvers;
