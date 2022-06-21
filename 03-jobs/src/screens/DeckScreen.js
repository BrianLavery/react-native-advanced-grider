import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import Swipe from '../components/Swipe';
import { likeJob } from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// CacheEnabled for map means that map renders as static image (should be quick)
const DeckScreen = ({ jobs, navigation, likeJob }) => {
	const renderCard = (item) => {
		const initialRegion = {
			longitude: item.coordinates.longitude,
			latitude: item.coordinates.latitude,
			longitudeDelta: 0.02,
			latitudeDelta: 0.02,
		};

		return (
			<Card key={item.id}>
				<Card.Title>{item.name}</Card.Title>
				<Card.Divider />
				<Card.Image source={{ uri: item.image_url }} />
				<Card.Divider />
				<View style={styles.detailWrapper}>
					<Text>{item.categories[0].title}</Text>
					<Text>{item.price}</Text>
				</View>
				<View style={styles.detailWrapper}>
					<Text>{item.rating} / 5</Text>
					<Text>{item.review_count} reviews</Text>
				</View>
				<Card.Divider />
				<View style={{ height: SCREEN_HEIGHT * 0.3 }}>
					<MapView
						scrollEnabled={false}
						style={{ flex: 1 }}
						cacheEnabled={false}
						initialRegion={initialRegion}></MapView>
				</View>
			</Card>
		);
	};

	const renderNoMoreCards = () => {
		return (
			<Card>
				<Card.Title>No more restaurants</Card.Title>
				<Card.Divider />
				<Button
					title='Review Liked Restaurants'
					backgroundColor='#03A9F4'
					onPress={() => {
						navigation.navigate('review');
					}}></Button>
			</Card>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Swipe
				data={jobs}
				renderCard={renderCard}
				renderNoMoreCards={renderNoMoreCards}
				keyProp='id'
				onSwipeRight={(job) => likeJob(job)}
			/>
		</SafeAreaView>
	);
};

DeckScreen.navigationOptions = {
	title: 'Select',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 8,
	},
});

const mapStateToProps = ({ jobs }) => {
	return { jobs };
};

export default connect(mapStateToProps, { likeJob })(DeckScreen);
