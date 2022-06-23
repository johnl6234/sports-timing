import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
	const switchSport = e => {
		console.log('number', e);
	};

	let buttons = [];
	for (let i = 0; i < 10; i++) {
		buttons.push(
			<Button
				onPress={() => switchSport(i)}
				name={`${i}`}
				title={`${i}`}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.container}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
