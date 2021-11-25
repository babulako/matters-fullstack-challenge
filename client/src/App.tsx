import React from 'react';
import {
  ApolloClient,
  ApolloProvider, 
  NormalizedCacheObject,
} from '@apollo/client';
import { Router } from '@reach/router';

import cache from './cache';
import ArticleList from './pages/ArticleList';
import Article from './pages/Article';
import Post from './pages/Post';

const client = new ApolloClient<NormalizedCacheObject>({
  uri: 'http://localhost:4000',
  cache,
});
 
const App:React.FC = () => (
  <div style={{ padding: 50 }}>
    <ApolloProvider client={client}>
      <Router> 
        <ArticleList path="/" />
        <Post path="/post" />
        <Article path="/:id" />
      </Router>
    </ApolloProvider>
  </div>
);

export default App;
