import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				const fontToLoad = [Ionicons.font];
				const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));

				await Promise.all(fontPromises);
			} catch (e) {
				console.warn(e);
			} finally {
				setLoading(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (loading) {
			await SplashScreen.hideAsync();
		}
	}, [loading]);

	if (!loading) {
		return null;
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<Text>!</Text>
			<StatusBar style="auto" />
		</View>
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
