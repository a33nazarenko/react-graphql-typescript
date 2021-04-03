import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
})

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map((item: any) => (
    <div key={item.currency}>
      <p>
        {item.currency}: {item.rate}
      </p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        App
      </div>
      <ExchangeRates />
    </ApolloProvider>
  );
}

export default App;
