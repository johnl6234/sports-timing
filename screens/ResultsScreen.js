import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { moderateScale } from '../utils';
import dataStore from '../dataStore';
import ResultItem from '../components/ResultItem';
import { addToResults } from '../localStorage';
import CustomButton from '../components/CustomButton';
import { createCSV, saveFile, assignLapPositions } from '../utils/savefiles';
export default function ResultsScreen({ navigation }) {
	const [results, setResults] = useState(dataStore.results);
	const [refresh, setRefresh] = useState(true);
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			assignLapPositions().then(() => {
				setResults(dataStore.results);
				setRefresh(refresh => !refresh);
			});
		});
		return unsubscribe;
	}, [navigation]);
	const renderItem = ({ item, index }) => (
		<ResultItem
			onPress={() => ShowDetails(item.number)}
			result={item}
			index={index + 1}
		/>
	);
	const ShowDetails = raceNumber => {
		let competitor = results.find(res => res.number === raceNumber);
		navigation.navigate('details', { details: competitor });
	};
	const checkEnd = () => {
		Alert.alert(
			'Export Result?',
			'This will Export results as a .csv file and clear all data',
			[
				{ text: 'Cancel', style: 'cancel', onPress: () => {} },
				{
					text: 'Save',
					style: 'destructive',
					// If the user confirmed, then we dispatch the action we blocked earlier
					// This will continue the action that had triggered the removal of the screen
					onPress: saveResults,
				},
			]
		);
	};

	const alertError = message => {
		Alert.alert('Error', message || 'Data failed to export', [
			{ text: 'Cancel', style: 'cancel', onPress: () => {} },
			{
				text: 'Try Again',
				style: 'destructive',
				onPress: saveFile,
			},
		]);
	};

	const saveResults = async () => {
		//await assignLapPositions();
		let saveData = await createCSV();
		let done = await addToResults(saveData);
		if (saveData.status && done) {
			dataStore.competitorList.forEach(comp => (comp.racing = false));
			dataStore.competitors = [];
			dataStore.startType = '';
			dataStore.results = [];
			dataStore.events = [];
			navigation.navigate('setUpRace');
		} else {
			alertError(saveData);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<FlatList
				data={results}
				renderItem={renderItem}
				keyExtractor={item => item.number}
			/>
			<View style={styles.buttonContainer}>
				<CustomButton
					style={styles.endButton}
					textStyle={styles.buttonText}
					onPress={checkEnd}
					title={'Save Results'}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0A043C',
		flex: 1,
		padding: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	endButton: {
		backgroundColor: 'red',
		borderRadius: 10,
		width: moderateScale(150),
		padding: 10,
	},
	buttonText: {
		fontSize: moderateScale(18),
		color: 'white',
		textAlign: 'center',
	},
	end: {
		border: 1,
		width: 50,
		marginHorizontal: 50,
		borderColor: 'black',
		textAlign: 'center',
		color: 'white',
	},
});
