import {
	Button,
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

const ResultItem = ({ result }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{result.name}</Text>
		<Text style={styles.title}>
			{result.results.overall === 'DNF'
				? result.results.overall
				: convertMsToTime(result.results.overall)}
		</Text>
	</View>
);

export default ResultItem;
function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}
function convertMsToTime(milliseconds) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = minutes % 60;

	// 👇️ If you don't want to roll hours over, e.g. 24 to 00
	// 👇️ comment (or remove) the line below
	// commenting next line gets you `24:00:00` instead of `00:00:00`
	// or `36:15:31` instead of `12:15:31`, etc.
	hours = hours % 24;

	return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
		seconds
	)}`;
}
const styles = StyleSheet.create({
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 15,
	},
});
