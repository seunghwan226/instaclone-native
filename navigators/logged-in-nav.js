import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/feed";
import React from "react";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
	return (
		<Tabs.Navigator>
			<Tabs.Screen name="Feed" component={Feed}></Tabs.Screen>
		</Tabs.Navigator>
	);
}
