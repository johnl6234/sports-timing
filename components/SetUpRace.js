import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	Button,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import dataStore from '../Data';
import CustomButton from './CustomButton';

export default function SetUpRace({ navigation }) {
	const [text, onChangeText] = useState('');
	const [type, setType] = useState(null);
	const [events, setEvents] = useState([]);
	const [startType, setStartType] = useState(dataStore.startType);

	const toggleStartType = startType => {
		setStartType(startType);
		if (startType === 'humberRunner') {
			setEvents([
				{ name: 'Run 1', type: 'running' },
				{ name: 'Bike', type: 'bicycle' },
				{ name: 'Run 2', type: 'running' },
			]);
		} else if (startType === 'cliffPratt') {
			setEvents([
				{ name: 'Run 1', type: 'running' },
				{ name: 'Bike', type: 'bicycle' },
			]);
		}
		dataStore.startType = startType;
	};

	const AddEvent = () => {
		let newEvents = events;
		if (text !== '' && type !== null) {
			newEvents.push({
				name: text,
				type: type,
			});
			setEvents(newEvents);
			setType(null);
			onChangeText('');
		}
	};
	const onFinish = () => {
		let newEvents = events;
		newEvents.push({
			name: 'stop',
			type: 'stop',
		});
		dataStore.events = newEvents;
		dataStore[dataStore.startType].competitors.sort(
			(a, b) => a.number - b.number
		);
		navigation.navigate('addCompetitor');
	};
	const renderItem = ({ item }) => (
		<Text style={styles.event}>
			{item.name}: {item.type}
		</Text>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.row}>
				<TouchableOpacity
					style={
						startType === 'cliffPratt'
							? styles.active
							: styles.button
					}
					onPress={() => toggleStartType('cliffPratt')}>
					<Text style={styles.text}>Cliff Pratt</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						startType === 'humberRunner'
							? styles.active
							: styles.button
					}
					onPress={() => toggleStartType('humberRunner')}>
					<Text style={styles.text}>humber Runner</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.text}>Event name</Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
				placeholder="event"
				placeholderTextColor={'#BBBBBB'}
			/>
			<Text style={styles.text}>Event type</Text>
			<Picker
				style={styles.input}
				selectedValue={type}
				onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
				<Picker.Item label="Swim" value="swimmer" />
				<Picker.Item label="Cycle" value="bicycle" />
				<Picker.Item label="Run" value="running" />
			</Picker>
			<View style={styles.buttonContainer}>
				<CustomButton
					title="Add Event"
					onPress={AddEvent}
					style={styles.finishButton}
					textStyle={styles.buttonText}
				/>
			</View>
			<FlatList
				data={events}
				renderItem={renderItem}
				keyExtractor={item => item.name}
			/>
			<View style={styles.buttonContainer}>
				<CustomButton
					title="FINISH"
					onPress={onFinish}
					style={styles.finishButton}
					textStyle={styles.buttonText}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0A043C',
		flex: 1,
		padding: 20,
	},
	input: {
		fontSize: 17,
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		color: '#BBBBBB',
		borderColor: '#BBBBBB',
		borderRadius: 10,
	},
	text: {
		color: '#BBBBBB',
		fontSize: 20,
	},
	event: {
		height: 40,
		margin: 12,
		padding: 10,
		color: '#BBBBBB',
		borderRadius: 10,
		backgroundColor: 'green',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	active: {
		padding: 10,
		borderRadius: 10,
		marginHorizontal: 10,
		marginBottom: 10,
		backgroundColor: 'green',
	},
	button: {
		padding: 10,
		borderRadius: 10,
		marginHorizontal: 10,
		marginBottom: 10,
		backgroundColor: 'rgba(255,0,0,0.3)',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	finishButton: {
		backgroundColor: '#18978F',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 20,
	},
	buttonText: {
		color: 'white',
	},
});
