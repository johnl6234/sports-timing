import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { convertMsToTime, moderateScale } from '../utils';

const ResultItem = ({ result, onPress, index }) => (
	<TouchableOpacity style={styles.item} onPress={onPress}>
		<View style={styles.positionView}>
			<Text style={styles.position}>
				{result.results.overall.position}
			</Text>
		</View>
		<View style={styles.nameView}>
			<Text style={styles.title}>{result.name}</Text>
			<Text style={styles.time}>
				{result.results.overall === 'DNF'
					? result.results.overall
					: convertMsToTime(result.results.overall.time)}
			</Text>
		</View>
		<View style={styles.numberView}>
			<Text style={styles.number}>Bib No:</Text>
			<Text style={styles.number}>{result.number}</Text>
		</View>
	</TouchableOpacity>
);
export default ResultItem;

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#03506F',
		padding: moderateScale(20),
		paddingVertical: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		display: 'flex',
		flexDirection: 'row',
		borderRadius: 15,
	},
	nameView: {
		flex: 3,
	},
	title: {
		color: '#BBBBBB',
		fontSize: moderateScale(16),
	},
	time: {
		color: '#BBBBBB',
		fontSize: moderateScale(16),
	},
	number: {
		color: '#BBBBBB',
		padding: 5,
		marginRight: 10,
		fontSize: moderateScale(18),
	},
	positionView: {
		width: moderateScale(50),
	},
	position: {
		color: '#FFE3D8',
		padding: 5,
		marginRight: 10,
		fontSize: moderateScale(25),
	},
	numberView: {
		flexDirection: 'row',
		flex: 1,
	},
});
