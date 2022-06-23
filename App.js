import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RaceScreen from './components/RaceScreen';
import ResultsScreen from './components/ResultsScreen';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="race" component={RaceScreen} />
				<Stack.Screen name="results" component={ResultsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
