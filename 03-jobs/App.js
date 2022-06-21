import { useEffect, useState, useRef } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import { PersistGate } from 'redux-persist/integration/react';
import * as Notifications from 'expo-notifications';

import registerForPushNotificationsAsync from './src/services/push_notifications';
import { store, persistor } from './src/store';
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

const finalApp = () => {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			setExpoPushToken(token);
		});

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
};

export default finalApp;
