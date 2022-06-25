import { useEffect, useState } from 'react';
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

import dataStore from '../Data';
import { storeData } from '../localStorage';
export default function AddCompetitorScreen({ navigation }) {
	const [text, onChangeText] = useState('');
	const [number, onChangeNumber] = useState(null);
	const [data, setData] = useState(
		dataStore[dataStore.startType].competitors
	);
	const [message, setMessage] = useState('');
	const [refresh, setRefresh] = useState(true);
	useEffect(() => {
		setData(dataStore[dataStore.startType].competitors);
	});
	const AddName = () => {
		if (text !== '' && number !== null) {
			let index = dataStore[dataStore.startType].competitors.findIndex(
				comp => comp.number == number
			);
			if (index < 0) {
				dataStore[dataStore.startType].competitors.push({
					name: text,
					number: number,
					racing: true,
				});
				dataStore[dataStore.startType].competitors.sort(
					(a, b) => a.number - b.number
				);
				setData(dataStore[dataStore.startType].competitors);
				setMessage('');
			} else {
				setMessage('Number already in use');
			}
			onChangeText('');
			onChangeNumber(null);
			storeData(
				dataStore.startType,
				dataStore[dataStore.startType].competitors
			);
		}
	};
	const toggleRacing = number => {
		let index = dataStore[dataStore.startType].competitors.findIndex(
			comp => comp.number === number
		);
		dataStore[dataStore.startType].competitors[index].racing =
			!dataStore[dataStore.startType].competitors[index].racing;
		setData(dataStore[dataStore.startType].competitors);
		setRefresh(refresh => !refresh);
	};
	const renderItem = ({ item }) => (
		<TouchableOpacity onPress={() => toggleRacing(item.number)}>
			<Text style={[styles.competitor, item.racing ? styles.racing : '']}>
				{item.number}: {item.name}
			</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<Text style={styles.message}>{message}</Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
				placeholder="name"
				placeholderTextColor={'#aaa'}
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangeNumber}
				value={number}
				placeholder="race Number"
				placeholderTextColor={'#aaa'}
				keyboardType="numeric"
			/>
			<Button onPress={AddName} title="AddName" />
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.number}
				extraData={refresh}
			/>
			<Button
				title="finish"
				onPress={() => navigation.navigate('raceStack')}
			/>
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
	competitor: {
		height: 40,
		margin: 12,
		padding: 10,
		color: 'white',
		borderRadius: 10,
		backgroundColor: 'red',
	},
	racing: {
		backgroundColor: 'green',
	},
	message: {
		color: 'red',
	},
});
