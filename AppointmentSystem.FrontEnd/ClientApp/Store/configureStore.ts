import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';
import * as Store from '../store';
import rootReducer from '../reducers';

export default function configureStore(initialState?: Store.ApplicationState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            autoRehydrate()
        )
    );
}