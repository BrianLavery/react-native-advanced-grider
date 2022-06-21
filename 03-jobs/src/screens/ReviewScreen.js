import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

const ReviewScreen = ({ likedJobs }) => {
	const renderLikedJobs = () => {
		return likedJobs.map((job) => {
			const { id, name, categories, url, coordinates } = job;
			const initialRegion = {
				latitude: coordinates.latitude,
				longitude: coordinates.longitude,
				latitudeDelta: 0.045,
				longitudeDelta: 0.02,
			};

			return (
				<Card key={id}>
					<View style={{ height: 200 }}>
						<MapView
							style={{ flex: 1 }}
							cacheEnabled={false}
							scrollEnabled={false}
							initialRegion={initialRegion}
						/>
						<View style={styles.detailWrapper}>
							<Text style={styles.italics}>{name}</Text>
							<Text style={styles.italics}>{categories[0].title}</Text>
						</View>
						<Button title='View Profile' backgroundColor='#03A9F4' onPress={() => Linking.openURL(url)} />
					</View>
				</Card>
			);
		});
	};

	return <ScrollView style={styles.container}>{renderLikedJobs()}</ScrollView>;
};

ReviewScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: 'Review',
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
		backgroundColor: '#fff',
	},
	detailWrapper: {
		marginBottom: 8,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	italics: {
		fontStyle: 'italic',
	},
});

const mapStateToProps = (state) => {
	return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
