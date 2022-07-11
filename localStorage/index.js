import AsyncStorage from '@react-native-async-storage/async-storage';
import dataStore from '../dataStore';
import competitorList from '../competitors';

export const getCompetitorData = async () => {
	let savedCompetitors = await getData('competitors');
	if (savedCompetitors !== null) {
		savedCompetitors.forEach(element => {
			element.racing = false;
		});
		dataStore.competitorList = savedCompetitors;
	} else {
		dataStore.competitorList = competitorList;
	}
};
export const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
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

export const addToResults = async data => {
	try {
		let resultsArray = await getData('results');
		if (resultsArray != null) {
			resultsArray.push(data);
		} else {
			resultsArray = [data];
		}
		await storeData('results', resultsArray);
		return true;
	} catch (e) {
		return e;
	}
};

export const clearResults = async () => {
	await AsyncStorage.removeItem('results');
};
