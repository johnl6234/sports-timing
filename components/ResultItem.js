import {
	Button,
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { convertMsToTime } from '../utils';

const ResultItem = ({ result, onPress, index }) => (
	<TouchableOpacity style={styles.item} onPress={onPress}>
		<View style={styles.positionView}>
			<Text style={styles.position}>{index}</Text>
		</View>
		<View style={styles.nameView}>
			<Text style={styles.title}>{result.name}</Text>
			<Text style={styles.time}>
				{result.results.overall === 'DNF'
					? result.results.overall
					: convertMsToTime(result.results.overall)}
			</Text>
		</View>
		<View>
			<Text style={styles.number}>No:</Text>
			<Text style={styles.number}>{result.number}</Text>
		</View>
	</TouchableOpacity>
);
export default ResultItem;

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#03506F',
		padding: 20,
		paddingVertical: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		display: 'flex',
		flexDirection: 'row',
		borderRadius: 15,
	},
	nameView: {
		width: 175,
	},
	title: {
		color: '#BBBBBB',
		fontSize: 18,
	},
	time: {
		color: '#BBBBBB',
		fontSize: 18,
	},
	number: {
		color: '#BBBBBB',
		padding: 5,
		marginRight: 10,
		fontSize: 18,
	},
	positionView: {
		width: 50,
	},
	position: {
		color: '#FFE3D8',
		padding: 5,
		marginRight: 10,
		fontSize: 25,
	},
});
