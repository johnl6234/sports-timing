import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
	Alert,
	Button,
	FlatList,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

import { convertMsToTime } from '../utils';
import dataStore from '../Data';
import ResultItem from '../components/ResultItem';
import { addToResults } from '../localStorage';
import CustomButton from '../components/CustomButton';

export default function ResultsScreen({ navigation }) {
	const [results, setResults] = useState(dataStore.results);
	const [refresh, setRefresh] = useState(true);
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setRefresh(refresh => !refresh);
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
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
	const saveResults = async () => {
		let csvHeader = 'name,number,';
		dataStore.events.forEach(event => {
			if (event.name !== 'stop') {
				csvHeader += event.name + ',';
			}
		});
		csvHeader += 'overall\n';
		let csv = '';
		dataStore.results.forEach(res => {
			csv += res.name + ',';
			csv += res.number + ',';
			for (let i = 0; i < dataStore.events.length; i++) {
				if (dataStore.events[i].name == 'stop') break;
				//check results for DNF
				if (
					!isNaN(res.results[dataStore.events[i].name]) &&
					res.results[dataStore.events[i].name] !== 'DNF'
				) {
					csv +=
						convertMsToTime(res.results[dataStore.events[i].name]) +
						',';
				} else {
					csv += 'DNF,';
				}
			}
			//check overall for DNF
			if (res.results.overall !== 'DNF') {
				csv += convertMsToTime(res.results.overall) + '\n';
			} else {
				csv += res.results.overall + '\n';
			}
		});

		csvHeader += csv;
		let date = new Date(Date.now()).toISOString().split('T');
		let newDate = date[0].split('-').join('');
		saveFile(newDate, csvHeader);
		let saveData = {
			date: newDate,
			type: dataStore.startType,
			results: dataStore.results,
		};
		let done = await addToResults(saveData);
		if (done === true) {
			dataStore[dataStore.startType].competitors.forEach(
				comp => (comp.racing = false)
			);
			dataStore.competitors = [];
			dataStore.results = [];
			navigation.navigate('setUpRace');
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

const saveFile = async (filename, file) => {
	const { status } = await MediaLibrary.getPermissionsAsync();
	if (status === 'granted') {
		let fileUri = FileSystem.documentDirectory + filename + '.csv';
		console.log('fileUri', fileUri);
		await FileSystem.writeAsStringAsync(fileUri, file, {
			encoding: FileSystem.EncodingType.UTF8,
		});
		await MediaLibrary.createAssetAsync(fileUri);
	}
};

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
		width: 150,
		padding: 10,
	},
	buttonText: {
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
