import AsyncStorage from '@react-native-async-storage/async-storage';
import dataStore from '../Data';

export const getCompetitorData = async () => {
	let prattResults = await getData('cliffPratt');
	console.log('prattResults', prattResults);
	//dataStore.cliffPratt.competitors = results;
	let humberResults = await getData('humberRunner');
	console.log('humberRunner', humberResults);
};
export const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
		let res = await getData(key);
		console.log('res', res);
	} catch (e) {
		// saving error
	}
};

export const getData = async key => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};

export const storeDataWithKey = async (key, value) => {
	try {
		let results = await getData(key);
		if (results) console.log('stored', results);
	} catch (e) {
		console.log('error', e);
	}
};
