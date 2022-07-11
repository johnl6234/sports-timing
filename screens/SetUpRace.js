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

import dataStore from '../dataStore';
import CustomButton from '../components/CustomButton';
import { moderateScale } from '../utils';
import competitorList from '../competitors';

export default function SetUpRace({ navigation }) {
	const [text, onChangeText] = useState('');
	const [type, setType] = useState(null);
	const [events, setEvents] = useState([]);
	const [startType, setStartType] = useState();

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
	};

	const clearEvents = () => {
		setEvents([]);
		setStartType('');
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
		dataStore.competitorList.sort((a, b) => a.number - b.number);
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
				<CustomButton
					title="Cliff Pratt"
					onPress={() => toggleStartType('cliffPratt')}
					style={
						startType === 'cliffPratt'
							? styles.active
							: styles.button
					}
					textStyle={styles.text}
				/>
				<CustomButton
					title="humber Runner"
					onPress={() => toggleStartType('humberRunner')}
					style={
						startType === 'humberRunner'
							? styles.active
							: styles.button
					}
					textStyle={styles.text}
				/>
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
				style={styles.picker}
				selectedValue={type}
				onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
				<Picker.Item
					style={styles.pickerItem}
					label="-- Choose Event Type --"
				/>
				<Picker.Item
					style={styles.pickerItem}
					label="Swim"
					value="swimmer"
				/>
				<Picker.Item
					style={styles.pickerItem}
					label="Cycle"
					value="bicycle"
				/>
				<Picker.Item
					style={styles.pickerItem}
					label="Run"
					value="running"
				/>
			</Picker>
			<View style={styles.buttonContainer}>
				<CustomButton
					title="Add Event"
					onPress={AddEvent}
					style={styles.finishButton}
					textStyle={styles.buttonText}
				/>
				<CustomButton
					title="Clear Events"
					onPress={clearEvents}
					style={styles.clearButton}
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
		fontSize: moderateScale(17),
		height: moderateScale(40),
		margin: 12,
		borderWidth: 1,
		padding: 10,
		color: '#BBBBBB',
		borderColor: '#BBBBBB',
		borderRadius: 10,
	},
	picker: {
		margin: 12,
		paddingLeft: 20,
		borderWidth: 1,
		backgroundColor: '#5d6a80',
		borderRadius: 10,
	},
	pickerItem: {
		width: '90%',
		marginLeft: 20,
		textAlign: 'center',
		fontWeight: 'bold',
		borderRadius: 10,
		fontSize: moderateScale(20),
	},
	text: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
	},
	event: {
		fontSize: moderateScale(17),
		margin: 12,
		padding: moderateScale(10),
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
		borderRadius: moderateScale(20),
	},
	clearButton: {
		marginLeft: 10,
		backgroundColor: 'rgb(255,0,0)',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: moderateScale(20),
	},
	buttonText: {
		fontSize: moderateScale(15),
		color: 'white',
	},
});
