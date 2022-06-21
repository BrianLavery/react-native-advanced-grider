import _ from 'lodash';
import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';

const likesReducer = (state = [], action) => {
	switch (action.type) {
		case LIKE_JOB:
			return _.uniqBy([action.payload, ...state], 'id'); // Reducer only keeps unique liked jobs
		case CLEAR_LIKED_JOBS:
			return [];
		default:
			return state;
	}
};

export default likesReducer;
