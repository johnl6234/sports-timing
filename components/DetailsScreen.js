import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { convertMsToTime } from '../utils';

const DetailsScreen = ({ navigation, route }) => {
	const [laps, setLaps] = useState([]);
	const { details } = route.params;
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			let newLaps = [];

			for (const [_key, _value] of Object.entries(details.results)) {
				newLaps.push(
					<Text style={styles.name} key={_key}>
						{_key}:{' '}
						{!isNaN(_value) ? convertMsToTime(_value) : 'DNF'}
					</Text>
				);
			}
			setLaps(newLaps);
		});
		return unsubscribe;
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.name}>{details.name}</Text>
				{laps}
			</View>
		</SafeAreaView>
	);
};

export default DetailsScreen;
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
		padding: 20,
	},
	item: {
		backgroundColor: '#3068c9',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		display: 'flex',
		flexDirection: 'row',
	},
	name: { color: 'white' },
	time: { color: 'white' },
	number: {
		color: 'white',
		padding: 5,
		marginRight: 10,
	},
});
