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

const ResultItem = ({ result, onPress }) => (
	<TouchableOpacity style={styles.item} onPress={onPress}>
		<View>
			<Text style={styles.number}>{result.number}</Text>
		</View>
		<View>
			<Text style={styles.title}>{result.name}</Text>
			<Text style={styles.time}>
				{result.results.overall === 'DNF'
					? result.results.overall
					: convertMsToTime(result.results.overall)}
			</Text>
		</View>
	</TouchableOpacity>
);
export default ResultItem;

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#3068c9',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		display: 'flex',
		flexDirection: 'row',
	},
	title: { color: 'white' },
	time: { color: 'white' },
	number: {
		color: 'white',
		padding: 5,
		marginRight: 10,
	},
});
