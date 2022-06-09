import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const MainNavigator = createBottomTabNavigator({
	welcome: WelcomeScreen,
	auth: AuthScreen,
	main: {
		screen: createBottomTabNavigator({
			map: MapScreen,
			deck: DeckScreen,
			Review: {
				screen: createStackNavigator({
					review: ReviewScreen,
					settings: SettingsScreen,
				}),
				navigationOptions: { title: 'Review Jobs' },
			},
		}),
	},
});

export default createAppContainer(MainNavigator);
