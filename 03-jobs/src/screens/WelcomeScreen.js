import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome to JobFinder', color: '#03A9F4' },
	{ text: 'We help you find a job', color: '#009688' },
	{ text: 'Set your location, then swipe!', color: '#880096' },
];

const WelcomeScreen = ({ navigation }) => {
	// In production application would be better to do this with a redux action creator
	const [token, setToken] = useState(null);

	const setLoadingScreen = async () => {
		if (_.isNull(token)) {
			await SplashScreen.preventAutoHideAsync();
		}

		const newToken = await AsyncStorage.getItem('fb_token');
		if (newToken) {
			navigation.navigate('map');
		}
		await SplashScreen.hideAsync();
		setToken(newToken);
	};

	useEffect(() => {
		setLoadingScreen();
	}, []);

	const onSlidesComplete = () => {
		navigation.navigate('auth');
	};

	return (
		<SafeAreaView style={styles.container}>
			<Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />
		</SafeAreaView>
	);
};

WelcomeScreen.navigationOptions = {
	title: 'Welcome',
	tabBarVisible: false,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default WelcomeScreen;
