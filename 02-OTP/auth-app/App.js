import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { initializeApp } from 'firebase/app';

import SignupForm from './src/components/SignupForm';
import SigninForm from './src/components/SigninForm';

export default function App() {
	useEffect(() => {
		const firebaseConfig = {
			apiKey: 'AIzaSyBypuqJAupthX3Gply-GROtdaSiKvTTurI',
			authDomain: 'react-native-advanced-otp.firebaseapp.com',
			databaseURL: 'https://react-native-advanced-otp-default-rtdb.asia-southeast1.firebasedatabase.app',
			projectId: 'react-native-advanced-otp',
			storageBucket: 'react-native-advanced-otp.appspot.com',
			messagingSenderId: '904543640315',
			appId: '1:904543640315:web:63d3371bb2bacfdb016e5e',
		};
		initializeApp(firebaseConfig);
	}, []);

	return (
		<View style={styles.container}>
			<SignupForm />
			<SigninForm />
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
