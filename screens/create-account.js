import React, { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth-button";
import AuthLayout from "../components/auth-layout";
import { TextInput } from "../components/auth-shared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const SIGNUP_MUTATION = gql`
	mutation (
		$userName: String!
		$firstName: String!
		$lastName: String
		$email: String!
		$password: String!
	) {
		createAccount(
			userName: $userName
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
		) {
			ok
			error
		}
	}
`;

export default function CreateAccount({ navigation }) {
	const { register, handleSubmit, setValue, getValues } = useForm();

	const onCompleted = (data) => {
		const {
			createAccount: { ok },
		} = data;
		const { userName, password } = getValues();
		if (ok) {
			navigation.navigate("Login", {
				userName,
				password,
			});
		}
	};
	const [createAccountMutation, { loading }] = useMutation(SIGNUP_MUTATION, {
		onCompleted,
	});
	const lastNameRef = useRef();
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const onNext = (nextOne) => {
		nextOne?.current?.focus();
	};
	const onValid = (data) => {
		if (!loading) {
			createAccountMutation({
				variables: {
					...data,
				},
			});
		}
	};

	useEffect(() => {
		register("firstName", {
			required: true,
		});
		register("lastName", {
			required: true,
		});
		register("userName", {
			required: true,
		});
		register("email", {
			required: true,
		});
		register("password", {
			required: true,
		});
	}, [register]);

	return (
		<AuthLayout>
			<TextInput
				placeholder="First Name"
				returnKeyType="next"
				onSubmitEditing={() => onNext(lastNameRef)}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onChangeText={(text) => setValue("firstName", text)}
			/>
			<TextInput
				ref={lastNameRef}
				placeholder="Last Name"
				returnKeyType="next"
				onSubmitEditing={() => onNext(usernameRef)}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onChangeText={(text) => setValue("lastName", text)}
			/>
			<TextInput
				ref={usernameRef}
				placeholder="User Name"
				returnKeyType="next"
				onSubmitEditing={() => onNext(emailRef)}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onChangeText={(text) => setValue("userName", text)}
			/>
			<TextInput
				ref={emailRef}
				placeholder="Email"
				keyboardType="email-address"
				returnKeyType="send"
				onSubmitEditing={() => onNext(passwordRef)}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onChangeText={(text) => setValue("email", text)}
			/>
			<TextInput
				ref={passwordRef}
				placeholder="Password"
				secureTextEntry
				returnKeyType="done"
				lastOne={true}
				placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
				onChangeText={(text) => setValue("password", text)}
				onSubmitEditing={handleSubmit(onValid)}
			/>
			<AuthButton
				text="Create Account"
				disabled={false}
				onPress={handleSubmit(onValid)}
				loading={false}
			/>
		</AuthLayout>
	);
}
