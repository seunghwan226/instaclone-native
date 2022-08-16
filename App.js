import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/logged-out-nav";
import { NavigationContainer } from "@react-navigation/native";
import client, { authVar, isLoggedInVar, cache } from "./apollo";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import LoggedInNav from "./navigators/logged-in-nav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [loading, setLoading] = useState(true);
	const isLoggedIn = useReactiveVar(isLoggedInVar);

	const preloadAssets = async () => {
		const fontToLoad = [Ionicons.font];
		const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
		const imagesToLoad = [
			require("./assets/icon.png"),
			"http://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
		];
		const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));

		return Promise.all([...fontPromises, ...imagePromises]);
	};

	useEffect(() => {
		async function prepare() {
			try {
				await preloadAssets();
			} catch (e) {
				console.warn(e);
			} finally {
				setLoading(false);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		await persistCache({
			cache,
			storage: new AsyncStorageWrapper(AsyncStorage),
		});
		const auth = await AsyncStorage.getItem("Authorization");
		if (auth) {
			isLoggedInVar(true);
			authVar(auth);
		}
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
