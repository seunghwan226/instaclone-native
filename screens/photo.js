import { gql } from "@apollo/client";
import { Text, TouchableOpacity, View } from "react-native";
const TOGGLE_LIKE_MUTATION = gql`
	mutation toggleLike($id: Int!) {
		toggleLike(id: $id) {
			ok
			error
		}
	}
`;
export default function Photo({ navigation }) {
	const updateToggleLike = (cache, result) => {
		const {
			data: {
				toggleLike: { ok },
			},
		} = result;
		if (ok) {
			const photoId = `Photo:${id}`;
			cache.modify({
				id: photoId,
				fields: {
					isLiked(prev) {
						return !prev;
					},
					likes(prev) {
						if (isLiked) {
							return prev - 1;
						}
						return prev + 1;
					},
				},
			});
			// const fragment = gql`
			// 	fragment BSName on Photo {
			// 		isLiked
			// 		likes
			// 	}
			// `;

			// const readResult = cache.readFragment({
			// 	id: fragmentId,
			// 	fragment,
			// });

			// if ("isLiked" in readResult && "likes" in readResult) {
			// 	const { isLiked: readIsLiked, likes: readLikes } = readResult;
			// 	cache.writeFragment({
			// 		id: fragmentId,
			// 		fragment,
			// 		data: {
			// 			isLiked: !readIsLiked,
			// 			likes: readIsLiked ? readLikes - 1 : readLikes + 1,
			// 		},
			// 	});
			// }
		}
	};

	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
		variables: {
			id,
		},
		update: updateToggleLike,
	});
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
				<Text style={{ color: "white" }}>Profile</Text>
			</TouchableOpacity>
		</View>
	);
}
