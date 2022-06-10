import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';

const MapScreen = () => {
	const [region, setRegion] = useState({
		longitude: -122,
		latitude: 37,
		longitudeDelta: 0.04,
		latitudeDelta: 0.09,
	});

	return (
		<SafeAreaView style={styles.container}>
			<MapView style={styles.map} initialRegion={region} />
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
	},
	map: {
		flex: 1,
	},
});

export default MapScreen;

// Indeed API Key: 4201738803816157
