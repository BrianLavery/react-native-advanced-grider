import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReviewScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ fontSize: 36 }}>ReviewScreen</Text>
		</SafeAreaView>
	);
};

// ReviewScreen.navigationOptions = {
// 	title: 'Review Jobs',
// 	headerRight: () => {
// 		return <Button title='Settings' />;
// 	},
// };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ReviewScreen;
