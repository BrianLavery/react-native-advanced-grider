import yelp from '../apis/yelp';
import reverseGeocode from 'latlng-to-zip';

import { FETCH_JOBS } from './types';

const fetchJobs = (region, term, navigationCallback) => async (dispatch) => {
	const { latitude, longitude } = region;
	try {
		const { data } = await yelp.get('/search', {
			params: {
				limit: 50,
				term,
				latitude,
				longitude,
			},
		});
		dispatch({ type: FETCH_JOBS, payload: data.businesses });
		navigationCallback();
	} catch (error) {
		console.log(error);
	}
};

const getZipCode = async (region) => {
	try {
		const zip = await reverseGeocode(region);
		console.log('zip:', zip);
	} catch (error) {
		console.log('zip-error', error);
	}
};

export { fetchJobs };
