import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import Swipe from '../components/Swipe';
import { likeJob } from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// CacheEnabled for map means that map renders as static image (should be quick)
const DeckScreen = ({ jobs, navigation, likeJob }) => {
	const renderCard = ({
		id,
		name,
		image_url,
		categories,
		price,
		rating,
		review_count,
		coordinates: { longitude, latitude },
	}) => {
		const initialRegion = {
			longitude,
			latitude,
			longitudeDelta: 0.02,
			latitudeDelta: 0.02,
		};

		return (
			<Card key={id}>
				<Card.Title>{name}</Card.Title>
				<Card.Divider />
				<Card.Image source={{ uri: image_url }} />
				<Card.Divider />
				<View style={styles.detailWrapper}>
					<Text>{categories[0].title}</Text>
					<Text>{price}</Text>
				</View>
				<View style={styles.detailWrapper}>
					<Text>{rating} / 5</Text>
					<Text>{review_count} reviews</Text>
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
					title='Search for more restaurants'
					large
					icon={{ name: 'my-location', color: 'white' }}
					backgroundColor='#03A9F4'
					onPress={() => {
						navigation.navigate('map');
					}}
				/>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ marginVertical: 8 }}>...OR...</Text>
				</View>
				<Button
					title='Review liked jobs'
					large
					icon={{ name: 'rate-review', color: 'white' }}
					backgroundColor='#03A9F4'
					onPress={() => {
						navigation.navigate('review');
					}}
				/>
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
	title: 'Restaurants',
	tabBarIcon: ({ tintColor }) => {
		return <Icon name='description' size={30} color={tintColor} />;
	},
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

// <Circle
// center={{ latitude, longitude }}
// radius={100}
// strokeColor='rgba(15,40,255,1.0)'
// fillColor='rgba(15,40,255,0.3)'
// />
