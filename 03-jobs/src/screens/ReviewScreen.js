import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReviewScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ fontSize: 36 }}>ReviewScreen</Text>
		</SafeAreaView>
	);
};

ReviewScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: 'Review Jobs',
		headerRight: () => {
			return (
				<Button
					title='Settings'
					onPress={() => {
						navigation.navigate('settings');
					}}
					type='clear'
					titleStyle={{ color: 'rgba(0, 122, 255, 1)' }}
				/>
			);
		},
		// Below has an example of platform specific code
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
		},
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ReviewScreen;
