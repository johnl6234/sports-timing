import { useEffect, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getData, storeData } from '../localStorage';
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
					{convertDate(item.date.toString())}
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
