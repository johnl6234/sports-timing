function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

export function convertMsToTime(milliseconds) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	seconds = seconds % 60;
	minutes = minutes % 60;
	// hours = hours % 24;

	return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
		seconds
	)}`;
}

import dataStore from '../dataStore';
export const calculateTimes = times => {
	let newEvents = [{ name: 'startTime' }, ...dataStore.events];
	let laps;
	// if timer stopped for racer overall time == stop - start in ms
	if ('stop' in times) {
		laps = {
			overall: { time: times.stop - times.startTime },
		};
	} else {
		laps = {
			overall: 'DNF',
		};
	}
	for (let i = 1; i < newEvents.length - 1; i++) {
		// for each event listed including start(0) and stop(length -1) times
		laps[newEvents[i].name] = {
			// time: = time time - the previous event time
			time: isNaN(times[newEvents[i].name] - times[newEvents[i - 1].name])
				? 'DNF'
				: times[newEvents[i].name] - times[newEvents[i - 1].name],
		};

		console.log('laps', laps);
	}
	return laps;
};

export const convertDate = str => {
	let date = str.split('');
	date.splice(4, 0, '/');
	date.splice(7, 0, '/');
	return date.join('');
};

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
	size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
