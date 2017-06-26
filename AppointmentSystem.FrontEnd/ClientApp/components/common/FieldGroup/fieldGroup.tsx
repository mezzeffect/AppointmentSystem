import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import cx from 'classnames';
const s: any = require('./fieldGroup.css');

export class FieldGroup extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { id, label, help, error, ...rest } = this.props;
        return (
            <FormGroup controlId={id} className={error ? cx('has-error', s.hasError) : ''}>
                {label && <label htmlFor="">{label}</label>}
                <FormControl {...rest} />
                {error && <HelpBlock className={s.helpError}>{error}</HelpBlock>}
            </FormGroup>
        );
    }
}