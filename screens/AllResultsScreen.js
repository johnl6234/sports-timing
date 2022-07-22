import { useEffect, useState } from 'react';
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getData, clearResults } from '../localStorage';
import { convertDate, moderateScale } from '../utils';

export default function AllResultsScreen({ navigation }) {
	const [allResults, setAllResults] = useState();
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadResults();
		});
		return unsubscribe;
	}, [navigation]);

	const loadResults = async () => {
		let results = await getData('results');
		if (!results) return;
		results.sort((a, b) => a.date - b.date);
		setAllResults(results);
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.date}
				onPress={() =>
					navigation.navigate('resultByDate', { results: item })
				}>
				<Text style={styles.text}>
					{item.date ? convertDate(item.date.toString()) : 'no date'}
				</Text>
			</TouchableOpacity>
		);
	};
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={allResults}
				renderItem={renderItem}
				keyExtractor={(item, index) =>
					item.date + '_' + index.toString()
				}
			/>
			{/* <Button title="clear results" onPress={() => clearResults()} /> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0A043C',
		flex: 1,
		padding: 20,
	},
	text: {
		color: '#BBBBBB',
		fontSize: moderateScale(20),
	},
});
