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

import dataStore from '../dataStore';
import CompetitorButton from '../components/CompetitorButton';
import CustomButton from '../components/CustomButton';
import { calculateTimes, moderateScale } from '../utils';
import StopWatch from '../components/StopWatch';

export default function RaceScreen({ navigation }) {
	const [buttons, setButtons] = useState([]);
	const [groupButtons, setGroupButtons] = useState([]);
	const [showStart, setShowStart] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [startGroup, setStartGroup] = useState([]);
	const [nonRacers, setNonRacers] = useState([]);
	const [startClock, setStartClock] = useState(false);

	// check if going back
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
							text: 'Leave',
							style: 'destructive',

							onPress: () => resetAndGoBack(e.data.action),
						},
					]
				);
			}),
		[navigation]
	);
	// reset data if going back
	const resetAndGoBack = e => {
		dataStore.competitorList.forEach(comp => (comp.racing = false));
		dataStore.competitors = [];
		navigation.dispatch(e);
	};

	// create competitor buttons
	if (!showStart && groupButtons && groupButtons.length < 1) {
		dataStore.competitorList.forEach(competitor => {
			if (competitor.racing) {
				groupButtons.push(competitor);
			}
		});
	}

	// add competitor to start group
	const addToGroup = _comp => {
		let list = startGroup.map(e => e);
		if (!list.some(e => e.number === _comp.number)) list.push(_comp);
		setStartGroup(list);
	};
	// add all competitors to start group for mass start
	const addAllCompetitors = () => {
		let startList = groupButtons.map(comp => comp);
		setStartGroup(startList);
	};

	const StartTimer = () => {
		let list = startGroup.map(comp => comp); // list of runners to set off
		let buttonList = groupButtons.map(butt => butt); // buttons of runners
		setStartClock(true);
		if (!dataStore.startTime) dataStore.startTime = new Date();
		// create competitor buttons
		list.forEach(competitor => {
			competitor.times = { startTime: Date.now() };
			buttons.push({
				number: competitor.number,
			});
			// remove start button for runner
			let index = buttonList.findIndex(
				button => button.number == competitor.number
			);
			buttonList.splice(index, 1);
		});

		dataStore.competitors.push(...list);
		buttons.sort((a, b) => a.number - b.number);
		const emptyList = [];
		if (buttonList.length > 0) setGroupButtons(buttonList);
		else {
			setGroupButtons(emptyList);
			setShowStart(true);
		}

		setStartGroup(emptyList);
	};
	const StopTimer = async () => {
		// clear buttons
		setButtons([]);
		// disable button
		setIsDisabled(true);
		// stop clock
		setStartClock(false);
		// Add unfinished competitors to results array as DNF
		let DNFArray = [];
		// collect all competitors marked as DNF
		for (let index in dataStore.competitors) {
			let competitor = dataStore.competitors[index];
			// calculate laps add DNF to uncompleted laps
			let laps = calculateTimes(competitor.times);
			if (laps.overall === 'DNF') {
				DNFArray.push({
					name: competitor.name,
					number: competitor.number,
					results: laps,
				});
			}
		}
		// add DNF to end of results
		dataStore.results.push(...DNFArray);
		navigation.navigate('results');
	};

	const addLateCompetitor = () => {
		let list = dataStore.competitorList.filter(
			comp => comp.racing === false
		);
		setShowStart(false);
		setNonRacers(list);
	};

	const addGroupButton = competitor => {
		competitor.racing = true;
		let list = groupButtons.map(x => x);
		list.push(competitor);
		list.sort((a, b) => a.number - b.number);
		setGroupButtons(list);
		setNonRacers([]);
	};
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<StatusBar style="light" />
				<StopWatch startClock={startClock} />
				<View style={styles.groupButtonContainer}>
					{buttons.map(competitor => {
						return (
							<CompetitorButton
								isDisabled={!showStart}
								key={competitor.number}
								number={competitor.number}
							/>
						);
					})}
				</View>

				<TouchableOpacity
					disabled={isDisabled}
					style={showStart ? styles.stop : styles.start}
					onPress={showStart ? StopTimer : StartTimer}>
					<Text style={styles.startText}>
						{showStart ? 'stop' : 'start'}
					</Text>
				</TouchableOpacity>

				<View style={styles.groupButtonContainer}>
					{groupButtons.map(competitor => {
						return (
							<TouchableOpacity
								key={competitor.number}
								style={[
									styles.button,
									startGroup.some(
										comp =>
											comp.number === competitor.number
									)
										? styles.selected
										: '',
								]}
								onPress={() => addToGroup(competitor)}>
								<Text style={styles.text}>
									{competitor.number}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<View style={styles.buttonContainer}>
					<CustomButton
						title="add competitor"
						onPress={addLateCompetitor}
						style={styles.finishButton}
						textStyle={styles.buttonText}
					/>
					<CustomButton
						title="add All"
						onPress={addAllCompetitors}
						style={styles.finishButton}
						textStyle={styles.buttonText}
					/>
				</View>
				<View>
					<View style={styles.groupButtonContainer}>
						{nonRacers.map(competitor => {
							return (
								<TouchableOpacity
									key={competitor.number}
									style={styles.button}
									onPress={() => addGroupButton(competitor)}>
									<Text style={styles.text}>
										{competitor.number}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
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
	selected: {
		backgroundColor: 'green',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginHorizontal: 5,
	},
	finishButton: {
		backgroundColor: '#18978F',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 20,
		marginHorizontal: 10,
	},
	buttonText: {
		fontSize: moderateScale(15),
		color: 'white',
	},
});
