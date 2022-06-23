import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RaceScreen from './components/RaceScreen';
import ResultsScreen from './components/ResultsScreen';
import DetailsScreen from './components/DetailsScreen';
import AddCompetitorScreen from './components/AddCompetitorScreen';
import SetUpRaceScreen from './components/SetUpRace';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="setUpRace" component={SetUpRaceScreen} />
				<Stack.Screen
					name="addCompetitor"
					component={AddCompetitorScreen}
				/>
				<Stack.Screen name="race" component={RaceScreen} />
				<Stack.Screen name="results" component={ResultsScreen} />
				<Stack.Screen name="details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
