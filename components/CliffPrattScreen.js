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
import { calculateTimes } from '../utils';
import { storeDataWithKey } from '../localStorage';

export default function CliffPrattScreen({ navigation }) {
	const [buttons, setButtons] = useState([]);
	const [groupButtons, setGroupButtons] = useState([]);
	const [showStart, setShowStart] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [startGroup, setStartGroup] = useState([]);

	if (!showStart && groupButtons && groupButtons.length < 1) {
		dataStore.cliffPratt.competitors.forEach(competitor => {
			if (competitor.racing) {
				groupButtons.push(competitor);
			}
		});
	}

	const addToGroup = _comp => {
		let list = startGroup.map(e => e);
		if (!list.some(e => e.number === _comp.number)) list.push(_comp);
		setStartGroup(list);
		console.log('group', startGroup);
	};
	const StartTimer = () => {
		let list = startGroup.map(comp => comp); // list of runners to set off
		let buttonList = groupButtons.map(butt => butt); // buttons of runners

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
			console.log('button index', index);
			buttonList.splice(index, 1);
			console.log('button', buttonList[index]);
		});

		dataStore.competitors.push(...list);
		console.log('comps', dataStore.competitors);
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
		// create object to save
		let results = {
			date: Date.now().toLocaleString(),
			results: dataStore.results,
		};
		storeDataWithKey('results', results);
		navigation.navigate('results');
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<StatusBar style="light" />
				<View style={styles.buttonContainer}>
					{buttons.map(competitor => {
						console.log('comp render', competitor);
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

				<View style={styles.buttonContainer}>
					{groupButtons.map(competitor => {
						console.log('group render', competitor);
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
	button: {
		width: 60,
		paddingVertical: 10,
		justifyContent: 'center',
		borderRadius: 10,
		margin: 10,
		backgroundColor: '#eee',
	},
	text: {
		color: '#000',
		fontSize: 20,
		marginHorizontal: 15,
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
	selected: {
		backgroundColor: 'green',
	},
});
