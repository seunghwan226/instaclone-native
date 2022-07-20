import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/feed";
import React from "react";
import Search from "../screens/search";
import Notifications from "../screens/notification";
import Profile from "../screens/profile";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import TabIcon from "../components/nav/tab-icon";
import Me from "../screens/me";
import StackNavFactory from "./stack-nav-factory";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
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
				name="TabFeed"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon iconName={"home"} color={color} focused={focused} />
					),
				}}
			>
				{() => <StackNavFactory screenName="Feed" />}
			</Tabs.Screen>
			<Tabs.Screen
				name="TabSearch"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon iconName={"search"} color={color} focused={focused} />
					),
				}}
			>
				{() => <StackNavFactory screenName="Search" />}
			</Tabs.Screen>
			<Tabs.Screen
				name="Camera"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon iconName={"camera"} color={color} focused={focused} />
					),
				}}
			>
				{() => <StackNavFactory screenName="Camera" />}
			</Tabs.Screen>
			<Tabs.Screen
				name="TabNotifications"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon iconName={"heart"} color={color} focused={focused} />
					),
				}}
			>
				{() => <StackNavFactory screenName="Notifications" />}
			</Tabs.Screen>
			<Tabs.Screen
				name="TabMe"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon iconName={"person"} color={color} focused={focused} />
					),
				}}
			>
				{() => <StackNavFactory screenName="Me" />}
			</Tabs.Screen>
		</Tabs.Navigator>
	);
}
