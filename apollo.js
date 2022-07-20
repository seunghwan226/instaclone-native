import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const authVar = makeVar("");

export const logUserIn = async (Authorization) => {
	await AsyncStorage.multiSet([
		["Authorization", JSON.stringify(Authorization)],
		["loggedIn", JSON.stringify("yes")],
	]);
	isLoggedInVar(true);
	authVar(Authorization);
};

const client = new ApolloClient({
	uri: "https://fb2b-111-91-152-107.jp.ngrok.io/graphql",
	cache: new InMemoryCache(),
});

export default client;
