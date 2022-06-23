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

import dataStore from '../Data';
export default function AddCompetitorScreen({ navigation }) {
	const [text, onChangeText] = useState('');
	const [number, onChangeNumber] = useState(null);
	const [data, setData] = useState(dataStore.competitors);
	const AddName = () => {
		if (text !== '' && number !== null) {
			dataStore.competitors.push({
				name: text,
				number: number,
			});
			onChangeText('');
			onChangeNumber(null);
			setData(dataStore.competitors);
		}
	};
	const renderItem = ({ item }) => (
		<Text style={styles.competitor}>
			{item.number}: {item.name}
		</Text>
	);

	return (
		<SafeAreaView style={styles.container}>
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
			/>
			<Button
				title="finish"
				onPress={() => navigation.navigate('race')}
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
		backgroundColor: 'green',
	},
});
