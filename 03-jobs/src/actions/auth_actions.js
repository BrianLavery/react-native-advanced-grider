import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';

import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';
import appId from '../environment/facebook';

// Action creator below is asynchronous which is where we use thunk
const appLogin = () => async (dispatch) => {
	const token = await AsyncStorage.getItem('fb_token');

	if (token) {
		// dispatch action saying FB login done
		dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
	} else {
		// Start up FB login process
		facebookLogin(dispatch);
	}
};

// This function is not an action creator - we pass in dispatch from action creator parent to helper function
const facebookLogin = async (dispatch) => {
	await Facebook.initializeAsync({ appId });
	const { type, token } = await Facebook.logInWithReadPermissionsAsync({
		permissions: ['public_profile'],
	});

	if (type === 'cancel') {
		return dispatch({ type: FACEBOOK_LOGIN_FAIL });
	}

	await AsyncStorage.setItem('fb_token', token);
	dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

export { appLogin };
