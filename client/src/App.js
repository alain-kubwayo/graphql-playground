import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./components/DisplayData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <h1 className="text-3xl font-bold underline">List of Users</h1>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
