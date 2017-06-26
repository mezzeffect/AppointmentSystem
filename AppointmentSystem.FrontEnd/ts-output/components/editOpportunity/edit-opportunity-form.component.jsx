import React from 'react';
import { FieldGroup } from '../common/FieldGroup';
import cx from 'classnames';
const s = require('./edit-opportunity-form.component.css');
export const EditOpportunityForm = ({ appointment, errors, onChange }) => {
    return (<div>
                <div className={s.opportunityFormContainer}>
                    <div className="row">
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Opportunity name" name="name" value={appointment.name} onChange={onChange} error={errors.name}/>
                        </div>
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Stage name" name="stageName" value={appointment.stageName} onChange={onChange} error={errors.stageName}/>
                        </div>
                    </div>
                    <div className={cx("row", s.heigherRow)}>
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Close date" name="closeDate" value={appointment.closeDate} onChange={onChange} error={errors.closeDate}/>
                        </div>
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Probability" name="probability" value={appointment.probability} onChange={onChange} error={errors.probability}/>
                        </div>
                    </div>
                    <div className={cx("row", s.heigherRow)}>
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Type" name="type" value={appointment.type} onChange={onChange} error={errors.type}/>
                        </div>
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Owner" name="ownerId" value={appointment.ownerId} onChange={onChange} error={errors.ownerId}/>
                        </div>
                    </div>
                    <div className={cx("row", s.heigherRow)}>
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Lead Source" name="leadSource" value={appointment.leadSource} onChange={onChange} error={errors.leadSource}/>
                        </div>
                        <div className="col-sm-6">
                            <FieldGroup type="text" label="Technology" name="technology" value={appointment.technology} onChange={onChange} error={errors.technology}/>
                        </div>
                    </div>
                </div>
            </div>);
};
EditOpportunityForm.propTypes = {
    appointment: React.PropTypes.array.isRequired,
    errors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
};
//# sourceMappingURL=edit-opportunity-form.component.jsx.map