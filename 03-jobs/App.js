import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './src/store';
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

reviewFlow.navigationOptions = {
	title: 'Review Restaurants',
	tabBarIcon: ({ tintColor }) => {
		return <Icon name='favorite' size={30} color={tintColor} />;
	},
};

const mainFlow = createBottomTabNavigator(
	{
		map: MapScreen,
		deck: DeckScreen,
		reviews: reviewFlow,
	},
	{
		tabBarOptions: {
			labelStyle: { fontSize: 11 },
		},
	}
);

mainFlow.navigationOptions = {
	tabBarVisible: false,
};

const MainNavigator = createBottomTabNavigator({
	welcome: WelcomeScreen,
	auth: AuthScreen,
	main: mainFlow,
});

const App = createAppContainer(MainNavigator);

export default () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};
