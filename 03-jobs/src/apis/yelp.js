import axios from 'axios';
import { apiKey } from '../environment/yelp';

export default axios.create({
	baseURL: 'https://api.yelp.com/v3/businesses',
	headers: {
		Authorization: `Bearer ${apiKey}`,
	},
});
