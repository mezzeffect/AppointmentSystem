import React from 'react';
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import { FieldGroup } from '../common/FieldGroup';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
const s = require('./login.css');
export const LoginForm = ({ userData, onSave, onChange, errors, onLoginWithSalesforce }) => {
    return (<div>
                {errors.summary && <div className="alert alert-danger">{errors.summary}</div>}
                <form className={s.root}>
                    <FieldGroup id="loginFormEmail" type="email" name="email" placeholder="User Name" value={userData.email} onChange={onChange} error={errors.email}/>
                    <FieldGroup id="loginFormPassword" type="password" name="password" placeholder="Password" value={userData.password} onChange={onChange} error={errors.password}/>
                    <Button bsStyle="success" className={cx("btn-block", s.btn)} type="button" onClick={onSave}>Login</Button>
                    <Link className={cx("btn btn-link btn-block", s.goToRegister)} to="register">Don't have access? create an account Now <Glyphicon glyph="log-in"/></Link>

                    <hr className={s.hr}/>
                </form>
            </div>);
};
LoginForm.propTypes = {
    userData: React.PropTypes.shape({
        email: React.PropTypes.string,
        password: React.PropTypes.string
    }),
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
    onLoginWithSalesforce: React.PropTypes.func.isRequired
};
//# sourceMappingURL=loginForm.jsx.map