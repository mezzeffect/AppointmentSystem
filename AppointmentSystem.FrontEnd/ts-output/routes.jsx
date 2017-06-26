import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/layout/layout';
import HomePage from './containers/home';
import AboutPage from './containers/about';
import LoginPage from './containers/login/login.component';
import RegistrationPage from './containers/register/register.component';
import OpportunityPage from './containers/opportunity/opportunity.component';
import EditOpportunityPage from './containers/opportunity/edit-opportunity.component';
import requireAuth from './services/Auth/auth';
const routesFactory = (store) => {
    const requireAuthWithStore = requireAuth(store);
    return (<Route path="/" component={App}>
            <IndexRoute component={HomePage} onEnter={requireAuthWithStore}/>
            <Route path="about" component={AboutPage} onEnter={requireAuthWithStore}/>
            <Route path="opportunity/:id" component={OpportunityPage} onEnter={requireAuthWithStore}/>
            <Route path="editopportunity/:id" component={EditOpportunityPage} onEnter={requireAuthWithStore}/>
            <Route path="addopportunity" component={EditOpportunityPage} onEnter={requireAuthWithStore}/>
            <Route path="login" component={LoginPage}/>
            <Route path="register" component={RegistrationPage}/>
        </Route>);
};
export default routesFactory;
// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}
//# sourceMappingURL=routes.jsx.map