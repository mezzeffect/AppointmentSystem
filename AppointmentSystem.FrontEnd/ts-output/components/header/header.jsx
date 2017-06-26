import React from 'react';
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import cx from 'classnames';
const s = require('./header.css');
export const Header = () => {
    return (<div>
            <div className={cx("row", s.header)}>
                <div className="col-sm-9"><h3 className={s.title}>
                    <Glyphicon glyph="list"/> List of current Opportunities: </h3>
                </div>
                <div className="col-sm-3 text-right">
                    <Link className="btn btn-default" to="/addopportunity">
                        <Glyphicon glyph="plus"/> Add new Opportunity</Link>
                </div>
            </div>
        </div>);
};
Header.propTypes = {};
//# sourceMappingURL=header.jsx.map