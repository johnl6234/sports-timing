import { useEffect, useState } from 'react';

import HumberRunnerScreen from './HumberRunnerScreen';
import CliffPrattScreen from './CliffPrattScreen';
import dataStore from '../Data';

export default function RaceScreen({ navigation }) {
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('updated', dataStore.events);
		});
		return unsubscribe;
	}, [navigation]);
	if (dataStore.startType === 'humberRunner') {
		let list = [];
		// if competitor registered as racing move to datastore.competitors
		dataStore.humberRunner.competitors.forEach(comp => {
			if (comp.racing) {
				list.push(comp);
			}
		});
		dataStore.competitors = list;
		dataStore.competitors.sort((a, b) => a.number - b.number);
		return <HumberRunnerScreen navigation={navigation} />;
	} else {
		return <CliffPrattScreen navigation={navigation} />;
	}
}
