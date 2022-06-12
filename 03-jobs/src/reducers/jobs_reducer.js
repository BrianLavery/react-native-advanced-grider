import { FETCH_JOBS } from '../actions/types';

const INITIAL_STATE = [];

const jobsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_JOBS:
			return action.payload;
		default:
			return state;
	}
};

export default jobsReducer;
