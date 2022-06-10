import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers'; // don't need to name file as called index.js

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

export default store;
