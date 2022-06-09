import axios from 'axios';
import ngrokUrl from './ngrokUrl';

const googleCloudFunctions = axios.create({
	baseURL: `${ngrokUrl}/react-native-advanced-otp/us-central1`,
});

export default googleCloudFunctions;
