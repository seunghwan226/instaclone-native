import {
	ActivityIndicator,
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { logUserOut } from "../apollo";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import ScreenLayout from "../components/screen-layout";

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
	const { data, loading } = useQuery(FEED_QUERY);
	const renderPhoto = ({ item: photo }) => {
		console.log(photo);
		return (
			<View style={{ flex: 1 }}>
				<Text>{photo.caption}</Text>
			</View>
		);
	};
	return (
		<ScreenLayout loading={loading}>
			<FlatList
				data={data?.seeFeed}
				keyExtractor={(item) => "" + item.id}
				renderItem={renderPhoto}
			/>
		</ScreenLayout>
	);
}
