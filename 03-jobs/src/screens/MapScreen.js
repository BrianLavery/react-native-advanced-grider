import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import { fetchJobs } from '../actions';

const MapScreen = ({ fetchJobs }) => {
	const [region, setRegion] = useState({
		longitude: -122,
		latitude: 37,
		longitudeDelta: 0.04,
		latitudeDelta: 0.09,
	});
	const [term, setTerm] = useState('');

	const onRegionChangeComplete = (region) => {
		setRegion(region);
	};

	const onButtonPress = () => {
		fetchJobs(region, term);
	};

	return (
		<SafeAreaView style={styles.container}>
			<MapView style={styles.map} initialRegion={region} onRegionChangeComplete={onRegionChangeComplete} />
			<View style={styles.inputContainer}>
				<Input
					placeholder='Enter your preferred cuisine'
					inputStyle={styles.inputStyle}
					inputContainerStyle={{ borderBottomWidth: 0 }}
					value={term}
					onChangeText={setTerm}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					large
					title='Search this area'
					backgroundColor='#009688'
					icon={{ name: 'search' }}
					onPress={onButtonPress}
				/>
			</View>
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
	buttonContainer: {
		position: 'absolute',
		bottom: 16,
		left: 32,
		right: 32,
	},
	inputContainer: {
		position: 'absolute',
		top: 64,
		left: 32,
		right: 32,
	},
	inputStyle: {
		backgroundColor: 'white',
		borderWidth: 0.5,
		borderColor: 'rgba(150,150,150,0.2)',
		borderRadius: 8,
		shadowColor: 'black',
		paddingHorizontal: 4,
	},
});

export default connect(null, { fetchJobs })(MapScreen);
