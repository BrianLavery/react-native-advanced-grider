import _ from 'lodash';
import { LIKE_JOB } from '../actions/types';

const likesReducer = (state = [], action) => {
	switch (action.type) {
		case LIKE_JOB:
			return _.uniqBy([action.payload, ...state], 'id'); // Reducer only keeps unique liked jobs
		default:
			return state;
	}
};

export default likesReducer;
