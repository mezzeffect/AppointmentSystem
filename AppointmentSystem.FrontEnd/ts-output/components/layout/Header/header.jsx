import * as React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { Nav, Navbar } from 'react-bootstrap';
const s = require('./Header.css');
export const Header = ({ user, logout }) => {
    return (<div className={s.root}>
        <Navbar className={s.navbar} collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className={cx(s.navLink, s.brandLink)} to="/">React Showcase</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <li>
                <Link className={s.navLink} to="about">About</Link>
              </li>
              <li>
                {user.isLoggedIn ?
        <Navbar.Text className={s.navText}>
                                    <span className={s.welcome}> Welcome , </span><Navbar.Link href="javascript:void(0)" onClick={logout}>Logout</Navbar.Link>
                  </Navbar.Text> :
        <Link className={s.navLink} to="login">Login</Link>}
              </li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>);
};
Header.propTypes = {
    user: React.PropTypes.shape({
        display_name: React.PropTypes.string,
        email: React.PropTypes.string,
        isLoggedIn: React.PropTypes.bool,
    }),
    logout: React.PropTypes.func.isRequired
};
//# sourceMappingURL=header.jsx.map