import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	Alert,
	Button,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import dataStore from '../Data';
import { storeData } from '../localStorage';
import { moderateScale } from '../utils';
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

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setRefresh(refresh => !refresh);
		});

		return unsubscribe;
	}, [navigation]);

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

	const showAlert = number => {
		Alert.alert('Save Result?', `Remove number: ${number}`, [
			{ text: 'Cancel', style: 'cancel', onPress: () => {} },
			{
				text: `Remove`,
				style: 'destructive',
				onPress: () => removeNumber(number),
			},
		]);
	};
	const removeNumber = number => {
		let index = dataStore[dataStore.startType].competitors.findIndex(
			comp => comp.number === number
		);
		dataStore[dataStore.startType].competitors.splice(index, 1);
		setRefresh(refresh => !refresh);
	};
	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => toggleRacing(item.number)}
			onLongPress={() => showAlert(item.number)}>
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
			<View style={styles.buttonContainer}>
				<CustomButton
					title="Add Name"
					onPress={AddName}
					style={styles.finishButton}
					textStyle={styles.buttonText}
				/>
			</View>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.number}
				extraData={refresh}
			/>
			<View style={styles.buttonContainer}>
				<CustomButton
					title="finish"
					onPress={() => navigation.navigate('raceStack')}
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
		fontSize: moderateScale(15),
		margin: 12,
		borderWidth: 1,
		padding: 10,
		color: '#BBBBBB',
		borderColor: '#BBBBBB',
		borderRadius: 10,
	},
	competitor: {
		fontSize: moderateScale(15),
		margin: 12,
		padding: 10,
		color: '#FFE3D8',
		borderRadius: 10,
		backgroundColor: 'red',
	},
	racing: {
		backgroundColor: 'green',
	},
	message: {
		color: 'red',
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
	},
	buttonText: {
		fontSize: moderateScale(15),
		color: 'white',
	},
});
