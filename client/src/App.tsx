import React from 'react';
import {
  ApolloClient,
  ApolloProvider, 
  NormalizedCacheObject,
} from '@apollo/client';
import cache from './cache';

const client = new ApolloClient<NormalizedCacheObject>({
  uri: 'http://localhost:4000',
  cache,
});
 
const App:React.FC = () => (
  <div style={{ padding: 50 }}>
    <ApolloProvider client={client}>
      Hello, world! :)
    </ApolloProvider>
  </div>
);

export default App;
