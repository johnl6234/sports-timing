import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
	Button,
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import ResultItem from './ResultItem';

export default function ResultsScreen({ navigation, route }) {
	const [results, setResults] = useState(route.params.results);

	const renderItem = ({ item }) => (
		<ResultItem onPress={() => ShowDetails(item.number)} result={item} />
	);
	const ShowDetails = raceNumber => {
		let competitor = results.find(res => res.number === raceNumber);
		navigation.navigate('details', { details: competitor });
	};
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<Text>Results here</Text>
			<FlatList
				data={results}
				renderItem={renderItem}
				keyExtractor={item => item.number}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
		padding: 20,
	},
});
