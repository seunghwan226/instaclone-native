import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image } from "react-native";
import Comments from "../screens/comments";
import Feed from "../screens/feed";
import Likes from "../screens/likes";
import Me from "../screens/me";
import Notifications from "../screens/notification";
import Photo from "../screens/photo";
import Profile from "../screens/profile";
import Search from "../screens/search";

const Stack = createNativeStackNavigator();
export default function StackNavFactory({ screenName }) {
	const isDarkMode = "dark";

	return (
		<Stack.Navigator
			screenOptions={{
				headerShadowVisible: true,
				headerBackTitleVisible: false,
				headerTintColor: isDarkMode === "dark" ? "white" : "black",
				headerStyle: {
					backgroundColor: "black",
				},
			}}
		>
			{screenName === "Feed" ? (
				<Stack.Screen
					name={"Feed"}
					component={Feed}
					options={{
						headerTitle: () => (
							<Image
								style={{
									maxHeight: 40,
									maxWidth: 120,
								}}
								resizeMode="contain"
								source={require("../assets/logo.png")}
							/>
						),
					}}
				/>
			) : null}
			{screenName === "Search" ? (
				<Stack.Screen name={"Search"} component={Search} />
			) : null}
			{screenName === "Notifications" ? (
				<Stack.Screen name={"Notifications"} component={Notifications} />
			) : null}
			{screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
			<Stack.Screen name="Profile" component={Profile}></Stack.Screen>
			<Stack.Screen name="Photo" component={Photo}></Stack.Screen>
			<Stack.Screen name="Likes" component={Likes}></Stack.Screen>
			<Stack.Screen name="Comments" component={Comments}></Stack.Screen>
		</Stack.Navigator>
	);
}
