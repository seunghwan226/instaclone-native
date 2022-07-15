import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";
import AuthButton from "../components/auth-button";
import AuthLayout from "../components/auth-layout";
import { TextInput } from "../components/auth-shared";

export default function Login() {
	const { register, handleSubmit, setValue } = useForm();
	const passwordRef = useRef();
	const onNext = (nextOne) => {
		nextOne?.current?.focus();
	};
	const onValid = (data) => {
		console.log(data);
	};

	useEffect(() => {
		register("username");
		register("password");
	}, [register]);

	return (
		<AuthLayout>
			<TextInput
				placeholder="User Name"
				returnKeyType="next"
				authCapitalize="none"
				onSubmitEditing={() => onNext(passwordRef)}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onChangeText={(text) => setValue("username", text)}
			/>
			<TextInput
				ref={passwordRef}
				placeholder="Password"
				secureTextEntry
				returnKeyType="done"
				lastOne={true}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onSubmitEditing={handleSubmit(onValid)}
				onChangeText={(text) => setValue("password", text)}
			/>
			<AuthButton
				disabled={true}
				text="Log In"
				onPress={handleSubmit(onValid)}
			></AuthButton>
		</AuthLayout>
	);
}
