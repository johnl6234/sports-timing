import { useState } from 'react';
import {
	Button,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import dataStore from '../Data';

export default function SetUpRace({ navigation }) {
	const [text, onChangeText] = useState('');
	const [type, setType] = useState(null);
	const [events, setEvents] = useState([]);

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
		dataStore.events = events;
		navigation.navigate('addCompetitor');
	};
	const renderItem = ({ item }) => (
		<Text style={styles.event}>
			{item.name}: {item.type}
		</Text>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Event name</Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
				placeholder="event"
				placeholderTextColor={'white'}
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
			<Button onPress={AddEvent} title="Add Event" />
			<FlatList
				data={events}
				renderItem={renderItem}
				keyExtractor={item => item.name}
			/>
			<Button title="finish" onPress={onFinish} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
		padding: 20,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		color: 'white',
		borderColor: 'white',
		borderRadius: 10,
	},
	text: {
		color: 'white',
	},
	event: {
		height: 40,
		margin: 12,
		padding: 10,
		color: 'white',
		borderRadius: 10,
		backgroundColor: 'green',
	},
});
