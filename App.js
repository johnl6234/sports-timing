import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';

import RaceScreen from './components/RaceScreen';
import ResultsScreen from './components/ResultsScreen';
import DetailsScreen from './components/DetailsScreen';
import AddCompetitorScreen from './components/AddCompetitorScreen';
import SetUpRaceScreen from './components/SetUpRace';
import AllResultsScreen from './components/AllResultsScreen';
import ResultsByDateScreen from './components/ResultsByDateScreen';

import { getCompetitorData } from './localStorage';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function RaceStack() {
	return (
		<Tab.Navigator barStyle={{ backgroundColor: '#03506F' }}>
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

function MainStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerBackVisible: false,
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
	);
}

function ResultsStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerBackVisible: false,
			}}>
			<Stack.Screen name="AllResults" component={AllResultsScreen} />
			<Stack.Screen name="resultByDate" component={ResultsByDateScreen} />
		</Stack.Navigator>
	);
}

function App() {
	getCompetitorData();
	return (
		<NavigationContainer>
			<Drawer.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: '#03506F' },
					headerTitleStyle: {
						color: '#FFE3D8',
					},
					headerTintColor: 'white',
					drawerStyle: {
						backgroundColor: '#03506F',
						width: 240,
					},
					drawerActiveTintColor: 'white',
					drawerInactiveTintColor: '#bbbbbb',
				}}>
				<Drawer.Screen name="Race Set Up" component={MainStack} />
				<Drawer.Screen
					options={{ title: 'All Results' }}
					name="ResultsStack"
					component={ResultsStack}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

export default App;
