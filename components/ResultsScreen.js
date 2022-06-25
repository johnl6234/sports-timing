import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
	Alert,
	Button,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

import { convertMsToTime } from '../utils';
import dataStore from '../Data';
import ResultItem from './ResultItem';

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
	const renderItem = ({ item }) => (
		<ResultItem onPress={() => ShowDetails(item.number)} result={item} />
	);
	const ShowDetails = raceNumber => {
		let competitor = results.find(res => res.number === raceNumber);
		navigation.navigate('details', { details: competitor });
	};
	const checkEnd = () => {
		Alert.alert('Save Result?', '', [
			{ text: 'Cancel', style: 'cancel', onPress: () => {} },
			{
				text: 'Save',
				style: 'destructive',
				// If the user confirmed, then we dispatch the action we blocked earlier
				// This will continue the action that had triggered the removal of the screen
				onPress: saveResults,
			},
		]);
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
	};
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<Text>Results here</Text>
			<FlatList
				data={results}
				renderItem={renderItem}
				keyExtractor={item => item.number}
			/>
			<View style={styles.buttonContainer}>
				<Button color="red" title="End Session" onPress={checkEnd} />
			</View>
		</SafeAreaView>
	);
}

const saveFile = async (filename, file) => {
	const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	if (status === 'granted') {
		let fileUri = FileSystem.documentDirectory + '/' + filename + '.csv';
		await FileSystem.writeAsStringAsync(fileUri, file, {
			encoding: FileSystem.EncodingType.UTF8,
		});
		const asset = await MediaLibrary.createAssetAsync(fileUri);
		await MediaLibrary.createAlbumAsync('Download', asset, false);
	}
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
		padding: 20,
	},
	endButton: {
		justifyContent: 'center',
		backgroundColor: 'red',
		borderRadius: 10,
		marginHorizontal: 20,
		padding: 10,
		paddingHorizontal: 50,
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
