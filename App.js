import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';

import RaceScreen from './screens/RaceScreen';
import ResultsScreen from './screens/ResultsScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddCompetitorScreen from './screens/AddCompetitorScreen';
import SetUpRaceScreen from './screens/SetUpRace';
import AllResultsScreen from './screens/AllResultsScreen';
import ResultsByDateScreen from './screens/ResultsByDateScreen';
import CompetitorListScreen from './screens/CompetitorListScreen';

import { getCompetitorData } from './localStorage';
import { moderateScale } from './utils';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RaceStack() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				headerBackVisible: false,
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'grey',
				tabBarActiveBackgroundColor: '#046991',
				tabBarLabelStyle: {
					textAlign: 'center',
					fontSize: moderateScale(18),
				},
				tabBarStyle: {
					backgroundColor: '#03506F',
					height: moderateScale(60),
					padding: 0,
				},
			}}>
			<Tab.Screen
				name="race"
				component={RaceScreen}
				options={{
					tabBarLabel: 'Race',
					tabBarIcon: ({ color }) => (
						<Icon
							name="flag-checkered"
							color={color}
							size={moderateScale(20)}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="results"
				component={ResultsScreen}
				options={{
					tabBarLabel: 'Results',
					tabBarIcon: ({ color }) => (
						<Icon
							name="list"
							color={color}
							size={moderateScale(20)}
						/>
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
						fontSize: moderateScale(18),
					},
					headerTintColor: 'white',
					drawerStyle: {
						backgroundColor: '#03506F',
						width: moderateScale(240),
					},
					drawerActiveTintColor: 'white',
					drawerInactiveTintColor: '#bbbbbb',
					drawerLabelStyle: {
						fontSize: moderateScale(20),
						paddingLeft: moderateScale(10),
					},
					drawerActiveBackgroundColor: '#046991',
				}}>
				<Drawer.Screen name="Race Set Up" component={MainStack} />
				<Drawer.Screen
					options={{
						title: 'All Results',
					}}
					name="ResultsStack"
					component={ResultsStack}
				/>
				<Drawer.Screen
					options={{
						title: 'Competitors',
					}}
					name="CompetitorsList"
					component={CompetitorListScreen}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

export default App;
