import { InMemoryCache, Reference } from '@apollo/client';

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        articles: {
          keyArgs: false,
          merge(existing, incoming) {
            let articles: Reference[] = existing && existing.articles || [];
            if (incoming && incoming.articles) {
              articles = articles.concat(incoming.articles);
            }
            return {
              ...incoming,
              articles,
            };
          }
        }
      }
    }
  }
});

export default cache;
