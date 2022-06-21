import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from '../reducers'; // don't need to name file as called index.js

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['likedJobs'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
