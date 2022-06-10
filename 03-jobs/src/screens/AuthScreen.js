import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { appLogin } from '../actions';

const AuthScreen = ({ appLogin }) => {
	useEffect(() => {
		appLogin();
		AsyncStorage.removeItem('fb_token');
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ fontSize: 36 }}>AuthScreen</Text>
		</SafeAreaView>
	);
};

AuthScreen.navigationOptions = {
	title: 'Auth',
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

export default connect(null, { appLogin })(AuthScreen);

// tabBarVisible: false
// lazy: true
