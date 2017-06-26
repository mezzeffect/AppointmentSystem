import { Store } from 'redux'
import { persistStore } from 'redux-persist'
import { ApplicationState } from '../../store';

export default (store: Store<ApplicationState>) => (nextState: any, replace: any) => {
    persistStore(store, {}, () => {
        const { user } = store.getState();
        // debugger
        if (user && !user.isLoggedIn) {
            replace('/login');
        }
    });
}