import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { persistStore } from 'redux-persist';
import _ from 'lodash';
import cx from 'classnames';
import { store } from '../../store';
import { authenticateUser, loginWithSalesforce, salesforceCallBack } from '../../actions';
import { LoginForm } from '../../components/loginForm';
const s = require('./login.component.css');
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loginUser = this.loginUser.bind(this);
        this.updateUserState = this.updateUserState.bind(this);
        this.loginWithSalesforce = this.loginWithSalesforce.bind(this);
        this.state = {
            user: Object.assign({}, props.user),
            errors: {},
            loading: false,
            rehydrated: false
        };
    }
    transitionTo(path) {
        let { router } = this.context;
        router.push(path);
    }
    componentWillMount() {
        persistStore(store, {}, () => {
            this.setState({ rehydrated: true });
        });
        // debugger;
        if (this.props.user.isLoggedIn) {
            this.transitionTo('/');
        }
    }
    updateUserState(event) {
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        return this.setState({ user: user });
    }
    loginFormIsValid() {
        let formIsValid = true;
        this.state.errors = {};
        if (!this.state.user.email) {
            this.state.errors.email = 'Email is required';
            formIsValid = false;
        }
        if (this.state.user.email && !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.user.email))) {
            this.state.errors.email = 'Please enter a valid email.';
            formIsValid = false;
        }
        if (!this.state.user.password) {
            this.state.errors.password = 'Password is required.';
            formIsValid = false;
        }
        this.setState({ errors: this.state.errors });
        return formIsValid;
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.user, nextProps.user)) {
            if (nextProps.location.query && nextProps.location.query.code) {
                this.setState({ loading: true });
                this.salesforceCallBack(nextProps.location.query);
            }
            else {
                this.state.errors = {};
                let errors = nextProps.user.errors;
                //this.state.errors.summary = errors.message;
                this.setState({ loading: false, errors: this.state.errors });
            }
        }
    }
    loginUser() {
        if (!this.loginFormIsValid()) {
            return;
        }
        // debugger
        this.props.authenticateUser(this.state.user).then(() => {
            if (this.props.user.isLoggedIn)
                this.transitionTo('/');
        });
    }
    loginWithSalesforce() {
        this.props.loginWithSalesforce();
    }
    salesforceCallBack(query) {
        this.props.salesforceCallBack(query);
    }
    render() {
        return (<div>
                <div className={s.topHeader}>
                    {(!this.props.user.token && !this.state.loading) && <h1>SalesForce show case</h1>}
                </div>
                <div className="row">
                    <div className={cx("col-sm-6 col-sm-offset-3")}>
                        {this.state.loading ?
            <div className={cx("alert alert-info text-center", s.customAlert)}>
                                <p>Please wait, browser will redirect automatically ...</p>
                            </div>
            :
                <div className={s.forms}>
                                <h2 className={s.title}>Login</h2>
                                <LoginForm onChange={this.updateUserState} userData={this.state.user} errors={this.state.errors} onSave={this.loginUser} onLoginWithSalesforce={this.loginWithSalesforce}/>
                            </div>}
                    </div>
                </div>
            </div>);
    }
}
Login.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}
function mapDispatchToProps(dispatch) {
    return {
        authenticateUser: bindActionCreators(authenticateUser, dispatch),
        loginWithSalesforce: bindActionCreators(loginWithSalesforce, dispatch),
        salesforceCallBack: bindActionCreators(salesforceCallBack, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=login.component.jsx.map