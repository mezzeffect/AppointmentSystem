import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), autoRehydrate()));
}
//# sourceMappingURL=configureStore.js.map