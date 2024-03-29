import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { logUserOut } from "../apollo";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import ScreenLayout from "../components/screen-layout";
import Photo from "../components/photo";
import React, { useState } from "react";

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
	query seeFeed($offset: Int!) {
		seeFeed(offset: $offset) {
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
export default function Feed() {
	const [offset, setOffset] = useState(0);
	const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
		variables: {
			offset: 0,
		},
	});
	const renderPhoto = ({ item: photo }) => {
		return <Photo {...photo} />;
	};
	const refresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	const [refreshing, setRefreshing] = useState(false);
	return (
		<ScreenLayout loading={loading}>
			<FlatList
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={refetch}
						tintColor="white"
					/>
				}
				onEndReachedThreshold={0.05}
				onEndReached={() =>
					fetchMore({
						variables: {
							offset: data?.seeFeed?.length,
						},
					})
				}
				style={{ width: "100%" }}
				data={data?.seeFeed}
				keyExtractor={(item) => "" + item.id}
				renderItem={renderPhoto}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenLayout>
	);
}
