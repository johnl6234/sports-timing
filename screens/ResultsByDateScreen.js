import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { convertDate, convertMsToTime, moderateScale } from '../utils';

export default function ResultsByDateScreen({ navigation, route }) {
	const [results, setResults] = useState(route.params.results);

	const renderItem = ({ item }) => {
		let newLaps = [];

		for (const [_key, _value] of Object.entries(item.results)) {
			newLaps.push({ key: _key, value: _value });
		}
		const lap = ({ item }) => (
			<View style={styles.lap} key={item.key}>
				<Text style={styles.keyText}>{item.key}:</Text>
				<Text style={styles.text}>
					{!isNaN(item.value) ? convertMsToTime(item.value) : 'DNF'}
				</Text>
			</View>
		);
		return (
			<View style={styles.details}>
				<View style={styles.nameView}>
					<Text style={styles.text}>{item.name}</Text>
				</View>
				<FlatList
					data={newLaps}
					renderItem={lap}
					keyExtractor={item => item.key}
				/>
			</View>
		);
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>{convertDate(results.date)}</Text>
			<FlatList
				data={results.results}
				renderItem={renderItem}
				keyExtractor={item => item.number}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0A043C',
		flex: 1,
		padding: 20,
	},
	title: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
		fontWeight: 'bold',
		marginBottom: 5,
	},
	text: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
	},
	keyText: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
		width: moderateScale(100),
	},
	details: {
		backgroundColor: '#03506F',
		marginBottom: moderateScale(10),
		borderRadius: moderateScale(10),
		padding: moderateScale(10),
	},
	nameView: {
		marginBottom: 5,
	},
	lap: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		backgroundColor: '#0A043C',
		padding: moderateScale(8),
		marginBottom: 5,
		borderRadius: 10,
	},
});
