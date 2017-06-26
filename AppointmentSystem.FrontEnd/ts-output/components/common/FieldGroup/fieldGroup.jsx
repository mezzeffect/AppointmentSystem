var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import cx from 'classnames';
const s = require('./fieldGroup.css');
export class FieldGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const _a = this.props, { id, label, help, error } = _a, rest = __rest(_a, ["id", "label", "help", "error"]);
        return (<FormGroup controlId={id} className={error ? cx('has-error', s.hasError) : ''}>
                {label && <label htmlFor="">{label}</label>}
                <FormControl {...rest}/>
                {error && <HelpBlock className={s.helpError}>{error}</HelpBlock>}
            </FormGroup>);
    }
}
//# sourceMappingURL=fieldGroup.jsx.map