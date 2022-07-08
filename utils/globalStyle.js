'use strict';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		//marginBottom: 40,
		//width: '100%',
		backgroundColor: '#191919',
		minHeight: '100%',
		color: '#ECDBBA',
	},
	text: {
		color: '#EDEDED',
		fontSize: 20,
	},
	col: {
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
	},
});

export const palette = {
	background: '#171717',
	main: '#444444',
	highlight: '#DA0037',
	lightText: '#EDEDED',
	tabBackground: '#242526',
};
