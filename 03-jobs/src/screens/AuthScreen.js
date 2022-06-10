import React, { useEffect } from 'react';
import { ActivityIndicator, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { appLogin } from '../actions';

const AuthScreen = ({ appLogin, token, navigation }) => {
	useEffect(() => {
		appLogin(); // this is asyncrhonous
	}, []);

	useEffect(() => {
		onAuthComplete();
	}, [token]);

	const onAuthComplete = () => {
		if (token) {
			navigation.navigate('map');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ActivityIndicator size='large' />
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

const mapStateToProps = ({ auth }) => {
	return { token: auth.token };
};

export default connect(mapStateToProps, { appLogin })(AuthScreen);
