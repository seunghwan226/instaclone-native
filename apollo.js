import {
	ApolloClient,
	InMemoryCache,
	makeVar,
	createHttpLink,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const authVar = makeVar("");

export const logUserIn = async (Authorization) => {
	await AsyncStorage.setItem("Authorization", Authorization);
	isLoggedInVar(true);
	authVar(Authorization);
};

export const logUserOut = async () => {
	await AsyncStorage.removeItem("Authorization");
	isLoggedInVar(false);
	authVar(null);
};

const httpLink = createHttpLink({
	uri: "https://2019-111-91-152-107.jp.ngrok.io/graphql",
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			Authorization: authVar(),
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					seeFeed: offsetLimitPagination(),
					// {
					// 	keyArgs: false,
					// 	merge(existing = [], incoming = []) {
					// 		return [...existing, ...incoming];
					// 	},
					// },
				},
			},
		},
	}),
});

export default client;
