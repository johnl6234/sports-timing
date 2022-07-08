import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from '../utils';
import { palette } from '../utils/globalStyle';

export default function StopWatch({ startClock }) {
	const [isActive, setIsActive] = useState(startClock);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);

	function start() {
		setIsActive(true);
	}
	const stopTimer = () => {
		setIsActive(false);
	};
	useEffect(() => {
		if (startClock && !isActive) start();
		else stopTimer();
	}, [startClock]);
	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds + 1);
				if (seconds >= 60) {
					setMinutes(minutes => minutes + 1);
					setSeconds(0);
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isActive, seconds]);

	return (
		<View style={styles.container}>
			<View style={styles.stopwatch}>
				<Text style={styles.timerText}>
					{minutes < 10 ? '0' : ''}
					{minutes}:{seconds < 10 ? '0' : ''}
					{seconds}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	stopwatch: {
		width: moderateScale(300),
		height: moderateScale(100),
		backgroundColor: palette.background,
		borderRadius: moderateScale(20),
		justifyContent: 'center',
		alignItems: 'center',
	},
	timerText: {
		textAlignVertical: 'center',
		color: 'white',
		fontSize: moderateScale(80),
	},
});
