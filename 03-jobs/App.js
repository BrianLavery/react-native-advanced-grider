import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const reviewFlow = createStackNavigator({
	review: ReviewScreen,
	settings: SettingsScreen,
});

reviewFlow.navigationOptions = { title: 'Review Jobs' };

const mainFlow = createBottomTabNavigator({
	map: MapScreen,
	deck: DeckScreen,
	reviews: reviewFlow,
});

const MainNavigator = createBottomTabNavigator({
	welcome: WelcomeScreen,
	auth: AuthScreen,
	main: mainFlow,
});

export default createAppContainer(MainNavigator);
