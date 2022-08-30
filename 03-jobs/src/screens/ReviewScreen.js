import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import MapView, { Circle } from 'react-native-maps';
import { connect } from 'react-redux';

const ReviewScreen = ({ likedJobs, navigation }) => {
	const renderLikedJobs = () => {
		return likedJobs.map((job) => {
			const {
				id,
				name,
				categories,
				url,
				coordinates: { latitude, longitude },
			} = job;
			const initialRegion = {
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: 0.045,
				longitudeDelta: 0.02,
			};

			return (
				<Card key={id}>
					<Card.Title>{name}</Card.Title>
					<Card.Divider />
					<View style={{ height: 200 }}>
						<MapView style={{ flex: 1 }} cacheEnabled={false} scrollEnabled={false} initialRegion={initialRegion}>
							<Circle
								center={{ latitude, longitude }}
								radius={250}
								strokeColor='rgba(15,40,255,1.0)'
								fillColor='rgba(15,40,255,0.3)'
							/>
						</MapView>
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

	return (
		<React.Fragment>
			<ScrollView style={styles.container}>{renderLikedJobs()}</ScrollView>
			<Button onPress={() => navigation.navigate('welcome')} style={{ marginBottom: 32 }} />
		</React.Fragment>
	);
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
		marginVertical: 8,
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
