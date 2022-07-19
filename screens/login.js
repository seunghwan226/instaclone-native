import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/auth-button";
import AuthLayout from "../components/auth-layout";
import { TextInput } from "../components/auth-shared";

const LOGIN_MUTATION = gql`
	mutation login($userName: String!, $password: String!) {
		login(userName: $userName, password: $password) {
			ok
			Authorization
			error
		}
	}
`;

export default function Login({ route: { params } }) {
	const { register, handleSubmit, setValue, watch } = useForm({
		defaultValues: {
			password: params?.password,
			userName: params?.userName,
		},
	});
	const passwordRef = useRef();
	const onCompleted = async (data) => {
		const {
			login: { ok, Authorization },
		} = data;

		if (ok) {
			await logUserIn(Authorization);
		}
	};
	const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
		onCompleted,
	});
	const onNext = (nextOne) => {
		nextOne?.current?.focus();
	};
	const onValid = (data) => {
		console.log(data);
		if (!loading) {
			loginMutation({
				variables: {
					...data,
				},
			});
		}
	};

	useEffect(() => {
		register("userName");
		register("password");
	}, [register]);

	return (
		<AuthLayout>
			<TextInput
				value={watch("userName")}
				placeholder="User Name"
				returnKeyType="next"
				authCapitalize="none"
				onSubmitEditing={() => onNext(passwordRef)}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onChangeText={(text) => setValue("userName", text)}
			/>
			<TextInput
				value={watch("password")}
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
				loading={loading}
				disabled={!watch("userName") || !watch("password")}
				text="Log In"
				onPress={handleSubmit(onValid)}
			></AuthButton>
		</AuthLayout>
	);
}
