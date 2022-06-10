import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';

const MapScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 13.728435051859396,
					longitude: 100.5710083251757,
					latitudeDelta: 0.03,
					longitudeDelta: 0.03,
				}}
			/>
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
