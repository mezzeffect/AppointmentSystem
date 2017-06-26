import React from 'react'
import { Link } from 'react-router'
import { FieldGroup } from '../common/FieldGroup'
import { Button } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import cx from 'classnames';
const s: any = require('./header.css')


export const Header: React.StatelessComponent<null> = () => {
    return (
        <div>
            <div className={cx("row", s.header)}>
                <div className="col-sm-9"><h3 className={s.title}>
                    <Glyphicon glyph="list" /> List of current Appointments: </h3>
                </div>
                <div className="col-sm-3 text-right">
                    <Link className="btn btn-default" to="/addopportunity">
                        <Glyphicon glyph="plus" /> Add new Appointment</Link>
                </div>
            </div>
        </div>
        );
}

Header.propTypes = {};
