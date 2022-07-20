import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Feed from "../../screens/feed";
import Me from "../../screens/me";
import Notifications from "../../screens/notification";
import Photo from "../../screens/photo";
import Profile from "../../screens/profile";
import Search from "../../screens/search";

const Stack = createNativeStackNavigator();

export default function StackNavFactory({ screenName }) {
	return (
		<Stack.Navigator>
			{screenName === "Feed" ? (
				<Stack.Screen name={"Feed"} component={Feed} />
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
		</Stack.Navigator>
	);
}
