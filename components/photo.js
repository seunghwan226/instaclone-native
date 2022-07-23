import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;

const Header = styled.View``;

const UserAvatar = styled.Image``;

const Username = styled.Text``;

const File = styled.Image``;

const Actions = styled.View``;

const Action = styled.TouchableOpacity``;

const Caption = styled.View``;

const CaptionText = styled.Text``;

const Likes = styled.Test``;

export default function Photo({ id, user, caption, file, isLiked, likes }) {
	const { width, height } = useWindowDimensions();
	return (
		<Container>
			<Header>
				<UserAvatar />
				<Username>{user.userName}</Username>
			</Header>
			<File style={{ width, height: height - 500 }} source={{ uri: file }} />
			<Actions>
				<Action />
				<Action />
			</Actions>
			<Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
			<Caption>
				<Username>{user.userName}</Username>
				<CaptionText>{caption}</CaptionText>
			</Caption>
		</Container>
	);
}
