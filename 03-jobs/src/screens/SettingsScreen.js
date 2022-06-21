import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { clearLikedJobs } from '../actions';

const SettingsScreen = ({ clearLikedJobs }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Button
				title='Reset Liked Jobs'
				large
				icon={{ name: 'delete-forever', color: 'white' }}
				buttonStyle={{ backgroundColor: '#F44336' }}
				onPress={clearLikedJobs}
			/>
		</SafeAreaView>
	);
};

SettingsScreen.navigationOptions = {
	title: 'Settings',
	tabBarVisible: false,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
});

export default connect(null, { clearLikedJobs })(SettingsScreen);
