import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";

export default function Me() {
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
				<Text style={{ color: "white" }}>Me</Text>
			</TouchableOpacity>
		</View>
	);
}
