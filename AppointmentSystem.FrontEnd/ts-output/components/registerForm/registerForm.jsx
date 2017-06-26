import React from 'react';
import { Link } from 'react-router';
import { FieldGroup } from '../common/FieldGroup';
import { Button, Glyphicon } from 'react-bootstrap';
import cx from 'classnames';
const s = require('./register.css');
export const RegisterForm = ({ userData, onSave, onChange, errors }) => {
    return (<div>
                {errors.summary && <div className="alert alert-danger">{errors.summary}</div>}
                <form className={s.root}>
                    <div className="row">
                        <div className="col-sm-6">
                            <FieldGroup id="registerFormFirstname" type="text" placeholder="First name" name="first_name" value={userData.first_name} onChange={onChange} error={errors.firstName}/>
                        </div>
                        <div className={cx('col-sm-6', s.no_padding_left)}>
                            <FieldGroup id="registerFormLastname" type="text" placeholder="Last name" name="last_name" value={userData.last_name} onChange={onChange} error={errors.lastName}/>
                        </div>
                    </div>
                    <FieldGroup id="registerFormEmail" type="email" placeholder="Email" name="email" value={userData.email} onChange={onChange} error={errors.email}/>
                    <FieldGroup id="registerFormPassword" type="password" placeholder="Password" name="password" value={userData.password} onChange={onChange} error={errors.password}/>
                    <FieldGroup id="registerFormPassword" type="password" placeholder="Confirm Password" name="confirmPassword" value={userData.confirmPassword} onChange={onChange} error={errors.confirmPassword}/>
                    <Button bsStyle="primary" className={cx("btn-block", s.btn)} type="button" onClick={onSave}>Register</Button>
                    <Link className={cx("btn btn-link btn-block", s.gotologin)} to="login">Already have account? login now <Glyphicon glyph="chevron-right"/></Link>
                </form>
            </div>);
};
//# sourceMappingURL=registerForm.jsx.map