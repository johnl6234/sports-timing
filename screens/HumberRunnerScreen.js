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
import CompetitorButton from '../components/CompetitorButton';
import { calculateTimes, moderateScale } from '../utils';
import StopWatch from '../components/StopWatch';

export default function HumberRunnerScreen({ navigation }) {
	const [buttons, setButtons] = useState([]);
	const [showStart, setShowStart] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [competitors, setCompetitors] = useState(dataStore.competitors);
	const [startClock, setStartClock] = useState(false);

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
		setStartClock(true);
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
		setStartClock(false);
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
				<StopWatch startClock={startClock} />
				<View style={styles.buttonContainer}>
					{competitors.map(competitor => (
						<CompetitorButton
							styles={!showStart ? styles.disabled : ''}
							isDisabled={!showStart}
							key={competitor.number}
							number={competitor.number}
						/>
					))}
				</View>

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
	disabled: {
		opacity: 0.5,
		backgroundColor: 'grey',
	},
	groupButtonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 40,
	},
	buttonStart: {
		backgroundColor: 'green',
	},
	button: {
		minWidth: moderateScale(45),
		paddingVertical: 10,
		justifyContent: 'center',
		borderRadius: 10,
		margin: 10,
		backgroundColor: '#BBBBBB',
	},
	text: {
		color: '#000',
		fontSize: moderateScale(18),
		alignSelf: 'center',
	},
	start: {
		backgroundColor: 'green',
		padding: 10,
		marginHorizontal: 30,
		borderRadius: 15,
		justifyContent: 'center',
		marginBottom: moderateScale(20),
	},
	stop: {
		backgroundColor: 'red',
		padding: 10,
		marginHorizontal: 30,
		borderRadius: 15,
		justifyContent: 'center',
		marginBottom: moderateScale(20),
	},
	startText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: moderateScale(30),
		color: '#FFE3D8',
	},
	finishButton: {
		backgroundColor: '#18978F',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 20,
	},
	buttonText: {
		fontSize: moderateScale(15),
		color: 'white',
	},
});
