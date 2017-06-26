import { persistStore } from 'redux-persist';
export default (store) => (nextState, replace) => {
    persistStore(store, {}, () => {
        const { user } = store.getState();
        // debugger
        if (user && !user.isLoggedIn) {
            replace('/login');
        }
    });
};
//# sourceMappingURL=auth.jsx.map