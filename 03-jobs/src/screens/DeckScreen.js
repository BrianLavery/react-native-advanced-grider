import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import Swipe from '../components/Swipe';

const DeckScreen = ({ jobs }) => {
	const renderCard = (item) => {
		return (
			<Card key={item.id}>
				<Card.Title>{item.name}</Card.Title>
				<Card.Image source={{ uri: item.image_url }} />
				<View style={styles.detailWrapper}>
					<Text>{item.categories[0].title}</Text>
					<Text>{item.price}</Text>
				</View>
				<View style={styles.detailWrapper}>
					<Text>{item.rating} / 5</Text>
					<Text>{item.review_count} reviews</Text>
				</View>
				<Button icon={{ name: 'code' }} backgroundColor='#03A9F4' title='View Now!' />
			</Card>
		);
	};

	const renderNoMoreCards = () => {
		return (
			<Card>
				<Card.Title>All Done!</Card.Title>
				<Card.Divider />
				<Text style={{ marginBottom: 12 }}>There's no more content here!</Text>
				<Button title='Get more!' backgroundColor='#03A9F4'></Button>
			</Card>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Swipe data={jobs} renderCard={renderCard} renderNoMoreCards={renderNoMoreCards} />
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

export default connect(mapStateToProps)(DeckScreen);
