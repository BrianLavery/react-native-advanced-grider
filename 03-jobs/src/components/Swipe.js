import React, { Component } from 'react';
import {
	View,
	Animated,
	PanResponder,
	Dimensions,
	StyleSheet,
	LayoutAnimation,
	UIManager,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.3 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 500;
const CASCADE_AMOUNT_VERTICAL = 5;
const CASCADE_AMOUNT_HORIZONTAL = 0;

class Swipe extends Component {
	static defaultProps = {
		onSwipeRight: () => {},
		onSwipeLeft: () => {},
		keyProp: 'id',
	};

	constructor(props) {
		super(props);

		const position = new Animated.ValueXY(); // We don't set value here as we leave device to determine where placed

		const panResponder = PanResponder.create({
			// Determines if this PanResponder responds to user touch
			onStartShouldSetPanResponder: () => true,
			// Is called as user taps and drags around screen - argument names by convention
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy });
			},
			// Is called after user releases from screen
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx > SWIPE_THRESHOLD) {
					this.forceSwipe('right');
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					this.forceSwipe('left');
				} else {
					this.resetPosition();
				}
			},
		});

		// We don't use state to update panResponder or position so we could assign to this.panResponder and this.position if we chose to
		this.state = { panResponder, position, index: 0, firstItem: {} };
	}

	// NOT SURE FUNCTION BELOW WORKS - HE USED componentWillReceiveProps (deprecated) and this was suggested
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.data[0] !== prevState.firstItem) {
			return {
				index: 0,
				firstItem: nextProps.data[0],
			};
		}
		return null;
	}

	componentDidUpdate() {
		// This long line below is specifically for Android
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.spring();
	}

	// Animated.timing moves linear motion
	forceSwipe(direction) {
		const x = direction === 'right' ? SCREEN_WIDTH * 2 : -SCREEN_WIDTH * 2;

		Animated.timing(this.state.position, {
			toValue: { x, y: 0 },
			duration: SWIPE_OUT_DURATION,
			useNativeDriver: false,
		}).start(() => this.onSwipeComplete(direction)); // We can pass callback to start that is called after animation completes
	}

	onSwipeComplete(direction) {
		const { onSwipeLeft, onSwipeRight, data } = this.props;
		const item = data[this.state.index];

		direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
		this.state.position.setValue({ x: 0, y: 0 });
		this.setState({ index: this.state.index + 1 });
	}

	resetPosition() {
		Animated.spring(this.state.position, {
			toValue: { x: 0, y: 0 },
			useNativeDriver: false,
		}).start();
	}

	getCardStyle() {
		const { position } = this.state;

		// We want to tie horizontal direction to how much to rotate card
		// We want to tie input range to the device width
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-120deg', '0deg', '120deg'],
		});

		return {
			...position.getLayout(),
			transform: [{ rotate }],
		};
	}

	renderCards() {
		if (this.state.index >= this.props.data.length) {
			return this.props.renderNoMoreCards();
		}

		return this.props.data
			.map((item, arrayIndex) => {
				if (arrayIndex < this.state.index) {
					return null;
				}

				if (arrayIndex === this.state.index) {
					return (
						<Animated.View
							key={item[this.props.keyProp]}
							style={[this.getCardStyle(), styles.cardStyle]}
							{...this.state.panResponder.panHandlers}>
							{this.props.renderCard(item)}
						</Animated.View>
					);
				}

				// We use Animated.View here else we would rerender each time we change from one to the other
				return (
					<Animated.View
						key={item.id}
						style={[
							styles.cardStyle,
							{
								top: CASCADE_AMOUNT_VERTICAL * (arrayIndex - this.state.index) + SCREEN_HEIGHT * 0.02,
								left: CASCADE_AMOUNT_HORIZONTAL * (arrayIndex - this.state.index),
								zIndex: -arrayIndex,
							},
						]}>
						{this.props.renderCard(item)}
					</Animated.View>
				);
			})
			.reverse();
	}

	render() {
		return <View>{this.renderCards()}</View>;
	}
}

const styles = StyleSheet.create({
	cardStyle: {
		position: 'absolute',
		width: SCREEN_WIDTH,
		top: SCREEN_HEIGHT * 0.02,
	},
});

export default Swipe;
