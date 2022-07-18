import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
	uri: "https://a99a-111-91-152-107.jp.ngrok.io/graphql",
	cache: new InMemoryCache(),
});

export default client;
