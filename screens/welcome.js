import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Welcom({ navigation }) {
	return (
		<View>
			<Text>Welcome</Text>
			<TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
				<View>
					<Text>Go to Create Account</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<View>
					<Text>Go to Login</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
