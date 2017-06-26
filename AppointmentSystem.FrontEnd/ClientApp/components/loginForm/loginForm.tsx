import React from 'react'
import { Link } from 'react-router'
import { Glyphicon } from 'react-bootstrap';
import { FieldGroup } from '../common/FieldGroup'
import { Button } from 'react-bootstrap'
import cx from 'classnames';
const s: any = require('./login.css')

type LoginFormProps = {
    userData: {
        email: string,
        password: string
    },
    onSave: () => void,
    onChange: (event: any) => void,
    errors: any,
    onLoginWithSalesforce: () => void
};

export const LoginForm: React.StatelessComponent<LoginFormProps> =
    ({ userData, onSave, onChange, errors, onLoginWithSalesforce }) => {
        return (
            <div>
                {errors.summary && <div className="alert alert-danger">{errors.summary}</div>}
                <form className={s.root}>
                    <FieldGroup
                        id="loginFormEmail"
                        type="email"
                        name="email"
                        placeholder="User Name"
                        value={userData.email}
                        onChange={onChange}
                        error={errors.email} />
                    <FieldGroup
                        id="loginFormPassword"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={onChange}
                        error={errors.password} />
                    <Button bsStyle="success" className={cx("btn-block", s.btn)} type="button" onClick={onSave}>Login</Button>
                </form>
            </div>
        );
    }

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