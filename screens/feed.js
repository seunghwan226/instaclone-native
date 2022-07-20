import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";

export const PHOTO_FRAGMENT = gql`
	fragment PhotoFragment on Photo {
		id
		file
		likes
		commentNumber
		isLiked
	}
`;

export const COMMENT_FRAGMENT = gql`
	fragment CommentFragment on Comment {
		id
		user {
			userName
			avatar
		}
		payload
		isMine
		createdAt
	}
`;

const FEED_QUERY = gql`
	query seeFeed {
		seeFeed {
			...PhotoFragment
			user {
				userName
				avatar
			}
			file
			caption
			createdAt
			isMine
			comments {
				...CommentFragment
			}
		}
	}
	${PHOTO_FRAGMENT}
	${COMMENT_FRAGMENT}
`;
export default function Feed({ navigation }) {
	const { data } = useQuery(FEED_QUERY);
	console.log(data);
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TouchableOpacity onPress={() => logUserOut()}>
				<Text style={{ color: "white" }}>Photo</Text>
			</TouchableOpacity>
		</View>
	);
}
