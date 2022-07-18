import React, { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth-button";
import AuthLayout from "../components/auth-layout";
import { TextInput } from "../components/auth-shared";
import { useForm } from "react-hook-form";

export default function CreateAccount() {
	const { register, handleSubmit, setValue } = useForm();
	const lastNameRef = useRef();
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const onNext = (nextOne) => {
		nextOne?.current?.focus();
	};
	const onValid = (data) => {
		console.log(data);
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
