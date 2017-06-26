import 'bootstrap';
import * as React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import { store } from './store';
// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element.
render(<Provider store={store}>
        <Router history={browserHistory}>
            {routes(store)}
        </Router>
    </Provider>, document.getElementById('react-app'));
//# sourceMappingURL=boot-client.jsx.map