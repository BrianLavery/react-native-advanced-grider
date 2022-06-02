import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import Deck from './src/components/Deck';

const DATA = [
	{ id: 1, text: 'Card #1', uri: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=300' },
	{ id: 2, text: 'Card #2', uri: 'https://images.unsplash.com/photo-1571404549664-f65f8709c04d?w=300' },
	{ id: 3, text: 'Card #3', uri: 'https://images.unsplash.com/photo-1457104312140-ada7fcd34df7?w=300' },
	{ id: 4, text: 'Card #4', uri: 'https://images.unsplash.com/photo-1601150314716-d3a9b1007577?w=300' },
	{ id: 5, text: 'Card #5', uri: 'https://images.unsplash.com/photo-1601150314716-d3a9b1007577?w=300' },
	{ id: 6, text: 'Card #6', uri: 'https://images.unsplash.com/photo-1524162131972-cd1cf510d179?w=300' },
	{ id: 7, text: 'Card #7', uri: 'https://images.unsplash.com/photo-1557176707-aa46c0e347a1?w=300' },
	{ id: 8, text: 'Card #8', uri: 'https://images.unsplash.com/photo-1543306755-b5cbf78d366f?w=300' },
];

export default function App() {
	const renderCard = (item) => {
		return (
			<Card key={item.id}>
				<Card.Title>{item.text}</Card.Title>
				<Card.Image source={{ uri: item.uri }} />
				<Text style={{ marginBottom: 10 }}>I can customise the card further</Text>
				<Button icon={{ name: 'code' }} backgroundColor='#03A9F4' title='View Now!' />
			</Card>
		);
	};

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<Deck data={DATA} renderCard={renderCard} />
			</SafeAreaView>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
