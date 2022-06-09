import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';

import googleCloudFunctions from '../apis/googleCloudFunctions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SigninForm extends Component {
	state = { phone: '', code: '', errorMessage: '' };

	handleSubmit = async () => {
		try {
			let { data } = await googleCloudFunctions.post('/verifyOneTimePassword', {
				phone: this.state.phone,
				code: this.state.code,
			});

			firebase.auth().signInWithCustomToken(data.token);
		} catch (error) {
			this.setState({ errorMessage: error.message });
		}
	};

	onTextPhoneInput = (phone) => {
		this.setState({ phone, errorMessage: '' });
	};

	onTextCodeInput = (code) => {
		this.setState({ code, errorMessage: '' });
	};

	render() {
		return (
			<View style={styles.viewStyle}>
				<Input
					label='Enter Phone Number'
					inputContainerStyle={styles.inputContainer}
					value={this.state.phone}
					onChangeText={(phone) => this.onTextPhoneInput(phone)}
				/>
				<Input
					label='Enter code'
					inputContainerStyle={styles.inputContainer}
					value={this.state.code}
					onChangeText={(code) => this.onTextCodeInput(code)}
				/>
				<Button title='Submit' onPress={this.handleSubmit} />
				{this.state.errorMessage ? <Text>{this.state.errorMessage}</Text> : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		width: SCREEN_WIDTH * 0.8,
	},
	viewStyle: {
		marginVertical: 32,
		padding: 12,
		borderColor: 'black',
		borderWidth: 1,
	},
});

export default SigninForm;
