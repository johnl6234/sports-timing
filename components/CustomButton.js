import { Text, TouchableOpacity } from 'react-native';

export default function CustomButton({ style, textStyle, title, onPress }) {
	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<Text style={textStyle}>{title.toUpperCase()}</Text>
		</TouchableOpacity>
	);
}
