import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import dataStore from '../Data';
import CompetitorButton from './CompetitorButton';
const sportsIcons = ['swimmer', 'bicycle', 'running'];

export default function RaceScreen({ navigation }) {
	const [buttons, setButtons] = useState([]);
	const [showStart, setShowStart] = useState(false);

	if (buttons.length < 1) {
		dataStore.competitors.forEach(competitor =>
			buttons.push(
				<CompetitorButton
					isDisabled={!showStart}
					key={competitor.number}
					number={competitor.number}
				/>
			)
		);
	}

	const StartTimer = () => {
		dataStore.startTime = Date.now();
		// initiate times array with start time
		dataStore.competitors.forEach(competitor => {
			competitor.times = {
				startTime: dataStore.startTime,
			};
		});
		setShowStart(true);
	};

	const StopTimer = async () => {
		let results = [];
		let DNFArray = [];
		for (let index in dataStore.competitors) {
			let competitor = dataStore.competitors[index];
			let laps = calculateTimes(competitor.times);
			if (laps.overall !== 'DNF') {
				results.push({
					name: competitor.name,
					number: competitor.number,
					results: laps,
				});
			} else {
				DNFArray.push({
					name: competitor.name,
					number: competitor.number,
					results: laps,
				});
			}
		}
		results.sort((a, b) => a.results.overall - b.results.overall);
		results.push(...DNFArray);
		navigation.navigate('results', { results: results });
	};

	const calculateTimes = times => {
		let newEvents = ['startTime', ...dataStore.events];
		let laps;
		// if timer stopped for racer overall time == stop - start in ms
		if ('stop' in times) {
			laps = {
				overall: times.stop - times.startTime,
			};
		} else {
			laps = {
				overall: 'DNF',
			};
		}
		for (let i = 1; i < newEvents.length - 1; i++) {
			// for each event listed including start(0) and stop(length -1) times
			laps[`lap-${newEvents[i]}`] =
				times[newEvents[i]] - times[newEvents[i - 1]];
		}
		console.log('laps', laps);
		return laps;
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<StatusBar style="auto" />
				<View style={styles.buttonContainer}>{buttons}</View>

				<TouchableOpacity
					style={showStart ? styles.stop : styles.start}
					onPress={showStart ? StopTimer : StartTimer}>
					<Text style={styles.startText}>
						{showStart ? 'stop' : 'start'}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
		padding: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 40,
	},
	buttonStart: {
		backgroundColor: 'green',
	},
	start: {
		backgroundColor: 'green',
		padding: 10,
		marginHorizontal: 30,
		borderRadius: 15,
		justifyContent: 'center',
	},
	stop: {
		backgroundColor: 'red',
		padding: 10,
		marginHorizontal: 30,
		borderRadius: 15,
		justifyContent: 'center',
	},
	startText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 30,
		color: 'white',
	},
});
