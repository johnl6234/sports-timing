import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import dataStore from '../dataStore';
import { calculateTimes, moderateScale } from '../utils';

const CompetitorButton = props => {
	const [isDisabled, setIsDisabled] = useState();
	const [event, setEvent] = useState(dataStore.events[0]);

	const switchSport = () => {
		let number = props.number;
		let events = dataStore.events;
		let competitor = dataStore.competitors.find(
			comp => comp.number === number
		);
		//Add event and time to data
		if (competitor.times.startTime) {
			competitor.times[
				events[Object.keys(competitor.times).length - 1].name
			] = Date.now();
			// change event type for icon
			setEvent(events[Object.keys(competitor.times).length - 1]);
			// if finished last event
			if (event.name === events[events.length - 2].name) {
				setEvent({ type: 'flag-checkered' });
				setIsDisabled(true);
				// add stop time
				competitor.times.stop = Date.now();
				// calculate times and store results
				let laps = calculateTimes(competitor.times);
				dataStore.results.push({
					name: competitor.name,
					number: competitor.number,
					results: laps,
				});
			}
		}
	};

	const markDNF = () => {
		setEvent({ type: 'stop' });
		setIsDisabled(true);
	};

	return (
		<TouchableOpacity
			key={props.isDisabled}
			disabled={isDisabled}
			style={[styles.button, styles[event.type], props.styles]}
			onPress={switchSport}
			onLongPress={markDNF}>
			<Icon style={styles.text} name={event.type} />
			<Text style={styles.text}>{props.number}</Text>
		</TouchableOpacity>
	);
};

export default CompetitorButton;
const styles = StyleSheet.create({
	button: {
		width: moderateScale(60),
		paddingVertical: 10,
		justifyContent: 'center',
		borderRadius: 10,
		margin: 10,
	},
	text: {
		color: '#fff',
		fontSize: moderateScale(20),
		marginHorizontal: 15,
	},
	swimmer: { backgroundColor: 'blue' },
	running: { backgroundColor: 'orange' },
	bicycle: { backgroundColor: 'green' },
	stop: { backgroundColor: 'red' },
});
