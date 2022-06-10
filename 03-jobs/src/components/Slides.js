import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Slides = ({ data, onComplete }) => {
	const renderLastSlide = (index) => {
		if (index === data.length - 1) {
			return (
				<View style={{ marginTop: 16 }}>
					<Button
						title="Let's get started"
						raised
						buttonStyle={{ backgroundColor: '#280036' }}
						titleStyle={{ color: 'white' }}
						onPress={onComplete}
					/>
				</View>
			);
		}
	};

	const renderSlides = () => {
		return data.map((slideData, index) => {
			return (
				<View key={slideData.text} style={[styles.slideStyle, { backgroundColor: slideData.color }]}>
					<Text style={styles.textStyle}>{slideData.text}</Text>
					{renderLastSlide(index)}
				</View>
			);
		});
	};

	return (
		<View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }} pagingEnabled>
				{renderSlides()}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 32,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
	},
	slideStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,
	},
});

export default Slides;
