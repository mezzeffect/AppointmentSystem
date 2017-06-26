import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import cx from 'classnames';
import { registerNewUser } from '../../actions';
import { RegisterForm } from '../../components/registerForm';
const s = require('./register.component.css');
class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.registerUser = this.registerUser.bind(this);
        this.updateUserState = this.updateUserState.bind(this);
        this.state = {
            user: Object.assign({}, props.user),
            errors: {}
        };
    }
    transitionTo(path) {
        let { router } = this.context;
        router.push(path);
    }
    componentWillMount() {
        if (this.props.user.isLoggedIn) {
            this.transitionTo('/');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.user, nextProps.user)) {
            this.state.errors = {};
            // let errors = nextProps.user.errors;
            this.state.errors.summary = nextProps.user.errors.message;
            this.setState({ errors: this.state.errors });
            // switch (errors.errorCode) {
            //     case "DuplicateEmail":
            //         this.state.serverErrors.email = errors.message;
            //         break;
            //     case "PasswordRequiresNonAlphanumeric":
            //         this.state.serverErrors.password = errors.message;
            //         break;
            //     default:
            //         this.state.serverErrors = {};
            //         break;
            // }
            debugger;
        }
    }
    updateUserState(event) {
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        return this.setState({ user: user });
    }
    registerFormIsValid() {
        let isValid = true;
        if (this.state.errors.summary) {
            return false;
        }
        this.state.errors = {};
        debugger;
        if (this.state.user.first_name && this.state.user.first_name.length < 3) {
            this.state.errors.firstName = 'Must be at least 3 characters';
            isValid = false;
        }
        if (this.state.user.last_name && this.state.user.last_name.length < 3) {
            this.state.errors.lastName = 'Must be at least 3 characters';
            isValid = false;
        }
        if (!this.state.user.email) {
            this.state.errors.email = 'Email is required';
            isValid = false;
        }
        if (this.state.user.email && !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.user.email))) {
            this.state.errors.email = 'Please enter a valid email.';
            isValid = false;
        }
        if (!this.state.user.password) {
            this.state.errors.password = 'Password is required';
            isValid = false;
        }
        if (this.state.user.password && this.state.user.password.length < 6) {
            this.state.errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        if (this.state.user.confirmPassword && this.state.user.confirmPassword != this.state.user.password) {
            this.state.errors.confirmPassword = 'Password and confirm password are not match.';
            isValid = false;
        }
        this.setState({ errors: this.state.errors });
        debugger;
        return isValid;
    }
    registerUser() {
        debugger;
        if (!this.registerFormIsValid()) {
            return;
        }
        this.props.registerUser(this.state.user)
            .then(() => {
            if (!this.registerFormIsValid()) {
                return;
            }
            // if(this.props.user.isLoggedIn)
            // this.transitionTo('/');
        });
    }
    render() {
        return (<div>
                <div className="row">
                    <div className={s.topHeader}>
                        {!this.props.user.token && <h1>SalesForce show case</h1>}
                    </div>
                    <div className={cx("col-sm-6 col-sm-offset-3")}>
                        <div className={s.forms}>
                            <h2 className={s.title}>Registration</h2>
                            <RegisterForm onChange={this.updateUserState} userData={this.state.user} onSave={this.registerUser} errors={this.state.errors}/>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
Register.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}
function mapDispatchToProps(dispatch) {
    return {
        registerUser: bindActionCreators(registerNewUser, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
//# sourceMappingURL=register.component.jsx.map