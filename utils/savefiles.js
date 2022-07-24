import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import dataStore from '../dataStore';
import { convertMsToTime } from '.';

const saveFile = async (fileName, file) => {
	const fileUri = `${FileSystem.documentDirectory}${fileName}.csv`;
	await FileSystem.writeAsStringAsync(fileUri, file, {
		encoding: FileSystem.EncodingType.UTF8,
	});
	const { status } = await MediaLibrary.requestPermissionsAsync(false);
	if (status === 'granted') {
		try {
			await MediaLibrary.createAssetAsync(fileUri);
			return { status: true };
		} catch (e) {
			return { status: false, message: e };
		}
	}
};

const createCSV = async data => {
	if (data) {
		dataStore.results = data.results;
		dataStore.events = data.events;
		dataStore.type = data.type;
	}

	let csvHeader = 'name,bib number,';
	dataStore.events.forEach(event => {
		if (event.name !== 'stop') {
			csvHeader += event.name + ',';
			csvHeader += 'pos,';
		}
	});
	csvHeader += 'overall,pos\n';
	let csv = '';
	dataStore.results.forEach(res => {
		csv += res.name + ',';
		csv += res.number + ',';
		for (let i = 0; i < dataStore.events.length; i++) {
			if (dataStore.events[i].name == 'stop') break;

			//check results for DNF
			if (
				!isNaN(res.results[dataStore.events[i].name].time) &&
				res.results[dataStore.events[i].name].time !== 'DNF'
			) {
				csv +=
					convertMsToTime(
						res.results[dataStore.events[i].name].time
					) + ',';
				csv += res.results[dataStore.events[i].name].position + ',';
			} else {
				csv += 'DNF,,';
			}
		}
		//check overall for DNF
		if (res.results.overall.time !== 'DNF') {
			csv += convertMsToTime(res.results.overall.time) + ',';
			csv += res.results.overall.position + '\n';
		} else {
			csv += res.results.overall.time + ',\n';
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
	// create local csv file
	let saved = await saveFile(newDate, csvHeader);
	return {
		status: saved.status,
		date: newDate,
		type: dataStore.startType,
		results: dataStore.results,
		events: dataStore.events,
	};
};

const assignLapPositions = () => {
	for (let i = 0; i < dataStore.events.length; i++) {
		if (dataStore.events[i].name == 'stop') break;
		dataStore.results.sort(
			(a, b) =>
				a.results[dataStore.events[i].name].time -
				b.results[dataStore.events[i].name].time
		);
		dataStore.results.forEach((comp, index) => {
			comp.results[dataStore.events[i].name] = {
				...comp.results[dataStore.events[i].name],
				position: index + 1,
			};
		});
	}
	dataStore.results.sort(
		(a, b) => a.results.overall.time - b.results.overall.time
	);
	dataStore.results.forEach((comp, index) => {
		comp.results.overall.position = index + 1;
	});
};

export { saveFile, createCSV, assignLapPositions };
