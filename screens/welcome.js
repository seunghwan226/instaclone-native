import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../color";
import AuthButton from "../components/auth-button";
import AuthLayout from "../components/auth-layout";

const LoginLink = styled.Text`
	color: ${colors.blue};
	font-weight: 600;
	margin-top: 20px;
`;

export default function Welcom({ navigation }) {
	const goToCreateAccount = () => navigation.navigate("CreateAccount");
	const goToLogin = () => navigation.navigate("Login");

	return (
		<AuthLayout>
			<AuthButton
				disabled={false}
				onPress={goToCreateAccount}
				text="Create New Account"
			></AuthButton>
			<TouchableOpacity onPress={goToLogin}>
				<LoginLink>Log in</LoginLink>
			</TouchableOpacity>
		</AuthLayout>
	);
}
