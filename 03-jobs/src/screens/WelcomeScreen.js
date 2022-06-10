import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome to JobFinder', color: '#03A9F4' },
	{ text: 'Use this to get a job', color: '#009688' },
	{ text: 'Set your location, then swipe away!', color: '#880096' },
];

const WelcomeScreen = ({ navigation }) => {
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
