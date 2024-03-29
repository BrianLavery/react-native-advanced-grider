import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import googleCloudFunctions from '../apis/googleCloudFunctions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SignupForm extends Component {
	state = { phone: '', errorMessage: '' };

	handleSubmit = async () => {
		try {
			await googleCloudFunctions.post('/createUser', { phone: this.state.phone });
			await googleCloudFunctions.post('/requestOneTimePassword', { phone: this.state.phone });
		} catch (error) {
			this.setState({ errorMessage: error.message });
		}
	};

	onTextInput = (phone) => {
		this.setState({ phone, errorMessage: '' });
	};

	render() {
		return (
			<View style={styles.viewStyle}>
				<Input
					label='Enter Phone Number'
					inputContainerStyle={styles.inputContainer}
					value={this.state.phone}
					onChangeText={(phone) => this.onTextInput(phone)}
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

export default SignupForm;
