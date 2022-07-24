import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { convertMsToTime, moderateScale } from '../utils';
import { StatusBar } from 'expo-status-bar';

const DetailsScreen = ({ navigation, route }) => {
	const [laps, setLaps] = useState([]);
	const { details } = route.params;
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			let newLaps = [];

			for (const [_key, _value] of Object.entries(details.results)) {
				newLaps.push({ key: _key, value: _value });
			}
			setLaps(newLaps);
		});
		return unsubscribe;
	}, [navigation]);

	const lap = ({ item }) => (
		<View style={styles.lap} key={item.key}>
			<Text style={styles.keyText}>{item.key}:</Text>
			<Text style={styles.text}>
				{!isNaN(item.value.time)
					? convertMsToTime(item.value.time)
					: 'DNF'}
			</Text>
			<View style={styles.position}>
				<Text style={styles.text}>Pos:</Text>
				<Text style={styles.text}>{item.value.position}</Text>
			</View>
		</View>
	);
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />

			<View style={styles.details}>
				<View style={styles.nameView}>
					<Text style={styles.text}>{details.name}</Text>
					<Text style={[styles.text]}>
						Position: {details.results.overall.position}
					</Text>
				</View>
				<FlatList
					data={laps}
					renderItem={lap}
					keyExtractor={item => item.key}
				/>
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
		justifyContent: 'space-between',
		backgroundColor: '#0A043C',
		padding: moderateScale(8),
		marginBottom: 5,
		borderRadius: 10,
	},
	position: {
		flexDirection: 'row',
	},
});
