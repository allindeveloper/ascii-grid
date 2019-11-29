import {createStore, combineReducers, applyMiddleware} from 'redux';
import {products} from './reducers';
import thunk from 'redux-thunk';
// import {promiseMiddleware} from './middleware';
// import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';

let middlewares = [thunk]

const reducers = combineReducers({
    products
});

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')

    middlewares.push(logger)
}
const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
)
console.log("storesate", store.getState())
// logger has to be removed later in production
export default store;
