import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import RaceScreen from './components/RaceScreen';
import ResultsScreen from './components/ResultsScreen';
import DetailsScreen from './components/DetailsScreen';
import AddCompetitorScreen from './components/AddCompetitorScreen';
import SetUpRaceScreen from './components/SetUpRace';
import { getCompetitorData } from './localStorage';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function RaceStack() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="race"
				component={RaceScreen}
				options={{
					tabBarLabel: 'Race',
					tabBarIcon: ({ color }) => (
						<Icon name="flag-checkered" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="results"
				component={ResultsScreen}
				options={{
					tabBarLabel: 'Results',
					tabBarIcon: ({ color }) => (
						<Icon name="list" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

function App() {
	getCompetitorData();
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: '#201F3E' },
					headerTitleStyle: {
						color: 'white',
					},
				}}>
				<Stack.Screen name="setUpRace" component={SetUpRaceScreen} />
				<Stack.Screen
					name="addCompetitor"
					component={AddCompetitorScreen}
				/>
				<Stack.Screen
					name="raceStack"
					component={RaceStack}
					options={{ title: 'Race' }}
				/>
				<Stack.Screen name="details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
