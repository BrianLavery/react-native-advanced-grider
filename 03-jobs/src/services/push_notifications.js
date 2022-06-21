import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const registerForPushNotificationsAsync = async () => {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};

export default registerForPushNotificationsAsync;

//**************************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STEPHEN'S CODE

// const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'; // This doesn't seem to work any longer

// const registerForNotifications = async () => {
// 	const previousToken = await AsyncStorage.getItem('pushtoken');

// 	if (previousToken) {
// 		return;
// 	} else {
// 		const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

// 		if (status !== 'granted') {
// 			return;
// 		}

// 		const token = await Notifications.getExponentPushTokenAsync();
// 		axios.post(PUSH_ENDPOINT, { token: { token } }); // This would be replaced by our personal backend API
// 		AsyncStorage.setItem('pushtoken', token);
// 	}
// };

// export default registerForNotifications;
