import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
	Button,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import dataStore from '../Data';

const sportsIcons = ['swimmer', 'bicycle', 'running'];
import { convertMsToTime } from '../utils';
const CompetitorButton = props => {
	const [isDisabled, setIsDisabled] = useState();
	const [event, setEvent] = useState(dataStore.events[0]);
	console.log('events', dataStore.events);
	const switchSport = () => {
		console.log('start', dataStore.startTime);
		let number = props.number;
		let events = dataStore.events;

		//Add event and time to data
		if (dataStore.startTime !== null) {
			dataStore.competitors.forEach(competitor => {
				if (competitor.number === number) {
					// register event name with time
					competitor.times[
						events[Object.keys(competitor.times).length - 1].name
					] = Date.now();
					// change event type for icon
					setEvent(events[Object.keys(competitor.times).length - 1]);
					if (event.name === events[events.length - 2].name) {
						setEvent('stop');
						setIsDisabled(true);
						competitor.times.stop = Date.now();
					}
					console.log('times', competitor.times);
				}
			});
		}
	};

	return (
		<TouchableOpacity
			key={props.isDisabled}
			disabled={isDisabled}
			style={[styles.button, styles[event.type]]}
			onPress={switchSport}>
			<Icon style={styles.text} name={event.type} />
			<Text style={styles.text}>{props.number}</Text>
		</TouchableOpacity>
	);
};

export default CompetitorButton;
const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		padding: 5,
		borderRadius: 10,
		margin: 10,
	},
	text: {
		color: '#fff',
		fontSize: 20,
		marginHorizontal: 15,
	},
	swimmer: { backgroundColor: 'blue' },
	running: { backgroundColor: 'orange' },
	bicycle: { backgroundColor: 'green' },
	stop: { backgroundColor: 'red' },
});
