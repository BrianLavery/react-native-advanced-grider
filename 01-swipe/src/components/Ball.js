import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// Animated module works totally independent of state to move around

class Ball extends Component {
	position = new Animated.ValueXY({ x: 0, y: 0 });

	componentDidMount() {
		Animated.spring(this.position, {
			toValue: { x: 200, y: 500 },
			useNativeDriver: false,
		}).start();
	}

	render() {
		return (
			<Animated.View style={this.position.getLayout()}>
				<View style={styles.ball} />
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	ball: {
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 30,
		borderColor: 'darkblue',
	},
});

export default Ball;
