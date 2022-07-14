import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Welcome from "../screens/welcome";
import Login from "../screens/login";
import CreateAccount from "../screens/create-account";

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Welcome" component={Welcome} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="CreateAccount" component={CreateAccount} />
		</Stack.Navigator>
	);
}
