import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ball from './src/Ball';

export default function App() {
	return (
		<View style={styles.container}>
			<SafeAreaView>
				<Ball />
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
