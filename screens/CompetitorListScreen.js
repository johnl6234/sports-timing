import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import dataStore from '../dataStore';
import { moderateScale } from '../utils';

import competitorList from '../competitors';
const CompetitorListScreen = ({ navigation, route }) => {
	const [competitors, setCompetitors] = useState([]);
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			setCompetitors(dataStore.competitorList);
		});
		return unsubscribe;
	}, [navigation]);
	const renderItem = ({ item }) => {
		return (
			<Text style={styles.text}>
				{item.number}: {item.name}
			</Text>
		);
	};
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.details}>
				<FlatList
					data={competitors}
					renderItem={renderItem}
					keyExtractor={(item, index) => index}
				/>
			</View>
		</SafeAreaView>
	);
};

export default CompetitorListScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#03506F',
		flex: 1,
		padding: moderateScale(20),
	},
	nameView: {
		marginBottom: 10,
	},
	text: {
		color: '#BBBBBB',
		fontSize: moderateScale(18),
	},
	details: {
		borderRadius: 15,
		padding: moderateScale(20),
	},
});
