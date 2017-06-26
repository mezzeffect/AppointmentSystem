import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { persistStore } from 'redux-persist'
import cx from 'classnames'
import _ from 'lodash'
import { Header } from './Header/header'
import Footer from './Footer/footer'
import { logoutUser } from '../../actions'
import { store } from '../../store';
const s: any = require('./Layout.css')

class Layout extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, props.user)
    };

    this.logout = this.logout.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  transitionTo(path: string) {
    let { router } = this.context;
    router.push(path);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.user, nextProps.user)) {
      // debugger
      if (!nextProps.user.isLoggedIn)
        this.transitionTo('/login');
      // else
      //   this.transitionTo('/');
    }
  }

  logout() {
    this.props.logoutUser()
  }

  render() {
    const { location, params, route, router, routeParams, routes, ...rest } = this.props;
    return (
      <div className={s.root}>
        {this.props.user.isLoggedIn && <Header user={this.props.user} logout={this.logout} />}
        <main className="container">
          <div {...rest} className={cx(s.content, this.props.className)} />
          <Footer />
        </main>
      </div>
    );
  }
}

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
