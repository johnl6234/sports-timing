import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import dataStore from '../Data';
import CompetitorButton from './CompetitorButton';
import { calculateTimes } from '../utils';

export default function HumberRunnerScreen({ navigation }) {
	const [buttons, setButtons] = useState([]);
	const [showStart, setShowStart] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(
		() =>
			navigation.addListener('beforeRemove', e => {
				// Prevent default behavior of leaving the screen
				e.preventDefault();
				// Prompt the user before leaving the screen
				Alert.alert(
					'Discard',
					'Going back will reset all competitors',
					[
						{
							text: "Don't leave",
							style: 'cancel',
							onPress: () => {},
						},
						{
							text: 'Continue',
							style: 'destructive',

							onPress: () => resetAndGoBack(e.data.action),
						},
					]
				);
			}),
		[navigation]
	);

	const resetAndGoBack = e => {
		dataStore[dataStore.startType].competitors.forEach(
			comp => (comp.racing = false)
		);
		dataStore.competitors = [];
		navigation.dispatch(e);
	};
	if (!showStart && buttons && buttons.length < 1) {
		dataStore.competitors.forEach(competitor => {
			buttons.push(
				<CompetitorButton
					isDisabled={!showStart}
					key={competitor.number}
					number={competitor.number}
				/>
			);
		});
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
		setButtons([]);
		setIsDisabled(true);
		// Add unfinished competitors to results array as DNF
		let DNFArray = [];
		for (let index in dataStore.competitors) {
			let competitor = dataStore.competitors[index];
			let laps = calculateTimes(competitor.times);
			if (laps.overall === 'DNF') {
				DNFArray.push({
					name: competitor.name,
					number: competitor.number,
					results: laps,
				});
			}
		}
		dataStore.results.push(...DNFArray);
		navigation.navigate('results');
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<StatusBar style="light" />
				<View style={styles.buttonContainer}>{buttons}</View>

				<TouchableOpacity
					disabled={isDisabled}
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
		backgroundColor: '#0A043C',
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
		color: '#FFE3D8',
	},
});
