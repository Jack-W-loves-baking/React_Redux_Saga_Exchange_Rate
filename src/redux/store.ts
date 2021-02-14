// @ts-nocheck
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer';
import rootSaga from './saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

//for redux debug config
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
);

// mount it on the Store
const store = createStore(
    reducer,enhancer
)

// then run the saga
sagaMiddleware.run(rootSaga)



export default store;