import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/logged-out-nav";
import { NavigationContainer } from "@react-navigation/native";
import client, { isLoggedInVar } from "./apollo";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import LoggedInNav from "./navigators/logged-in-nav";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [loading, setLoading] = useState(true);
	const isLoggedIn = useReactiveVar(isLoggedInVar);

	useEffect(() => {
		async function prepare() {
			try {
				const fontToLoad = [Ionicons.font];
				const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
				const imagesToLoad = [
					require("./assets/icon.png"),
					"http://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
				];
				const imagePromises = imagesToLoad.map((image) =>
					Asset.loadAsync(image)
				);
				await Promise.all([...fontPromises, ...imagePromises]);
			} catch (e) {
				console.warn(e);
			} finally {
				setLoading(false);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (loading) {
			await SplashScreen.hideAsync();
		}
	}, [loading]);

	if (loading) {
		return <View onLayout={onLayoutRootView}></View>;
	}

	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				{isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
			</NavigationContainer>
		</ApolloProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
