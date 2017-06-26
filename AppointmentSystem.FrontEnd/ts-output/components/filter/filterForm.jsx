import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import cx from 'classnames';
const s = require('./filter.css');
export const FilterForm = ({ search, onFilter, onChange }) => {
    return (<div className={cx("row", s.searchBox)}>
                <div className="col-sm-4">
                    <input type="text" name="opportunity" value={search.appointment} onChange={onChange} placeholder="Opportunity name [optional]" className="form-control"/>
                </div>
                <div className="col-sm-3">
                    <input type="text" name="stage" value={search.stage} onChange={onChange} placeholder="opportunity stage [optional]" className="form-control"/>
                </div>
                <div className="col-sm-3">
                    <input type="text" name="closeDate" value={search.closeDate} onChange={onChange} placeholder="close date [optional]" className="form-control"/>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-info btn-block" onClick={onFilter}>
                        <Glyphicon glyph="filter"/> Filter
                    </button>
                </div>
            </div>);
};
FilterForm.propTypes = {
    search: React.PropTypes.shape({
        appointment: React.PropTypes.string,
        stage: React.PropTypes.string,
        closeDate: React.PropTypes.string
    }),
    onFilter: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
};
//# sourceMappingURL=filterForm.jsx.map