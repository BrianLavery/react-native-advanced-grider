import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ fontSize: 36 }}>MapScreen</Text>
		</SafeAreaView>
	);
};

MapScreen.navigationOptions = {
	title: 'Map',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default MapScreen;
