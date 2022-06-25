import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { convertMsToTime } from '../utils';
import { StatusBar } from 'expo-status-bar';

const DetailsScreen = ({ navigation, route }) => {
	const [laps, setLaps] = useState([]);
	const { details } = route.params;
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			let newLaps = [];

			for (const [_key, _value] of Object.entries(details.results)) {
				newLaps.push(
					<View styles={styles.lap} key={_key}>
						<Text style={styles.text}>
							{_key}:{' '}
							{!isNaN(_value) ? convertMsToTime(_value) : 'DNF'}
						</Text>
					</View>
				);
			}
			setLaps(newLaps);
		});
		return unsubscribe;
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.details}>
				<View style={styles.nameView}>
					<Text style={styles.text}>{details.name}</Text>
				</View>
				{laps}
			</View>
		</SafeAreaView>
	);
};

export default DetailsScreen;
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0A043C',
		flex: 1,
		padding: 20,
	},
	nameView: {
		marginBottom: 10,
	},
	text: {
		color: '#BBBBBB',
		fontSize: 20,
	},
	details: {
		backgroundColor: '#03506F',
		borderRadius: 15,

		padding: 20,
	},
	lap: {
		padding: 5,
		marginBottom: 15,
	},
});
