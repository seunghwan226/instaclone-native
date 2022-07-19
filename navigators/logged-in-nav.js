import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/feed";
import React from "react";
import Search from "../screens/search";
import Notifications from "../screens/notification";
import Profile from "../screens/profile";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
	const setIcons = ({ focused, color, size }, name) => {
		return <Ionicons name={name} color={color} size={focused ? 22 : 20} />;
	};
	return (
		<Tabs.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "black",
					borderTopColor: "rgba(255,255,255,0.5)",
				},
				tabBarActiveTintColor: "white",
			}}
		>
			<Tabs.Screen
				name="Feed"
				component={Feed}
				options={{
					tabBarIcon: (data) => {
						return setIcons(data, "home");
					},
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: (data) => {
						return setIcons(data, "search");
					},
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name="Notification"
				component={Notifications}
				options={{
					tabBarIcon: (data) => {
						return setIcons(data, "heart-outline");
					},
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: (data) => {
						return setIcons(data, "person");
					},
				}}
			></Tabs.Screen>
		</Tabs.Navigator>
	);
}
