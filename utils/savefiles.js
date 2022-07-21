import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import dataStore from '../dataStore';
import { convertMsToTime } from '.';

const saveFile = async (fileName, file) => {
	const fileUri = `${FileSystem.documentDirectory}${fileName}.csv`;
	const { status } = await MediaLibrary.requestPermissionsAsync(false);
	if (status === 'granted') {
		try {
			await MediaLibrary.createAssetAsync(fileUri);
			return { status: true };
		} catch (e) {
			console.log('error', e);
		}
	}
};

const createCSV = async data => {
	if (data) {
		dataStore.results = data.results;
		dataStore.events = data.events;
		dataStore.type = data.type;
	}

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
	let newDate;
	csvHeader += csv;
	if (data && data.date) {
		newDate = data.date;
	} else {
		let date = new Date(Date.now()).toISOString().split('T');
		newDate = date[0].split('-').join('');
	}

	let saved = await saveFile(newDate, csvHeader);
	return {
		status: saved.status,
		date: newDate,
		type: dataStore.startType,
		results: dataStore.results,
		events: dataStore.events,
	};
};
export { saveFile, createCSV };
