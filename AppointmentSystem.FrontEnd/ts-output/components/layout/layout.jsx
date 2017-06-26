var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import _ from 'lodash';
import { Header } from './Header/header';
import Footer from './Footer/footer';
import { logoutUser } from '../../actions';
const s = require('./Layout.css');
class Layout extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: Object.assign({}, props.user)
        };
        this.logout = this.logout.bind(this);
    }
    transitionTo(path) {
        let { router } = this.context;
        router.push(path);
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.user, nextProps.user)) {
            // debugger
            if (!nextProps.user.isLoggedIn)
                this.transitionTo('/login');
        }
    }
    logout() {
        this.props.logoutUser();
    }
    render() {
        const _a = this.props, { location, params, route, router, routeParams, routes } = _a, rest = __rest(_a, ["location", "params", "route", "router", "routeParams", "routes"]);
        return (<div className={s.root}>
        {this.props.user.isLoggedIn && <Header user={this.props.user} logout={this.logout}/>}
        <main className="container">
          <div {...rest} className={cx(s.content, this.props.className)}/>
          <Footer />
        </main>
      </div>);
    }
}
Layout.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}
function mapDispatchToProps(dispatch) {
    return {
        logoutUser: bindActionCreators(logoutUser, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
//# sourceMappingURL=layout.jsx.map