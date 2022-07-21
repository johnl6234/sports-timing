import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import { convertDate, convertMsToTime, moderateScale } from '../utils';
import { createCSV } from '../utils/savefiles';

export default function ResultsByDateScreen({ navigation, route }) {
	const [results, setResults] = useState(route.params.results);
	const alertError = (message, type) => {
		Alert.alert(type, message, [
			{ text: 'Cancel', style: 'cancel', onPress: () => {} },
			{
				// text: 'Try Again',
				// style: 'destructive',
				// onPress: () => {},
			},
		]);
	};
	const renderItem = ({ item }) => {
		let newLaps = [];

		for (const [_key, _value] of Object.entries(item.results)) {
			newLaps.push({ key: _key, value: _value });
		}
		const lap = ({ item }) => (
			<View style={styles.lap} key={item.key}>
				<Text style={styles.keyText}>{item.key}:</Text>
				<Text style={styles.text}>
					{!isNaN(item.value) ? convertMsToTime(item.value) : 'DNF'}
				</Text>
			</View>
		);

		return (
			<View style={styles.details}>
				<View style={styles.nameView}>
					<Text style={styles.text}> Bib No:{item.number}</Text>
					<Text style={styles.text}>{item.name}</Text>
					<Text style={[styles.text]}>Position: {item.position}</Text>
				</View>
				<FlatList
					data={newLaps}
					renderItem={lap}
					keyExtractor={item => item.key}
				/>
			</View>
		);
	};

	const exportData = async () => {
		let res = await createCSV(results);
		if (!res.status) {
			alertError(res.message, 'Error');
		} else {
			alertError('Data Exported Successfully', 'Success');
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>{convertDate(results.date)}</Text>
			<FlatList
				data={results.results}
				renderItem={renderItem}
				keyExtractor={item => item.number}
			/>
			<CustomButton
				style={styles.button}
				textStyle={styles.buttonText}
				onPress={exportData}
				title="Export Results"
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0A043C',
		flex: 1,
		padding: 20,
	},
	title: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
		fontWeight: 'bold',
		marginBottom: 5,
	},
	text: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
	},
	keyText: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
		width: moderateScale(100),
	},
	details: {
		backgroundColor: '#03506F',
		marginBottom: moderateScale(10),
		borderRadius: moderateScale(10),
		padding: moderateScale(10),
	},
	nameView: {
		marginBottom: 5,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	lap: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		backgroundColor: '#0A043C',
		padding: moderateScale(8),
		marginBottom: 5,
		borderRadius: 10,
	},
	button: {
		marginTop: 10,
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
