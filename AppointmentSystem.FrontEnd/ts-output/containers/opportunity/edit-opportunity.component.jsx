import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { Glyphicon } from 'react-bootstrap';
import { getAppointmentById as getOpportunityById, clearCurrentAppointment as clearCurrentOpportunity } from '../../actions';
const s = require('./opportunity.component.css');
class EditOpportunity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.backToOpportunityList = this.backToOpportunityList.bind(this);
        this.updateCurrentOpportunityState = this.updateCurrentOpportunityState.bind(this);
        this.state = {
            appointment: {}
        };
    }
    transitionTo(path) {
        let { router } = this.context;
        router.push(path);
    }
    backToOpportunityList() {
        this.transitionTo('/');
    }
    componentWillMount() {
        if (this.props.route.path == "addopportunity") {
        }
        else {
            this.props.getOpportunityById(this.props.params.id);
        }
    }
    componentWillUnmount() {
        this.props.clearCurrentOpportunity();
    }
    updateCurrentOpportunityState(event) {
        const field = event.target.name;
        let appointment = this.state.appointment;
        appointment[field] = event.target.value;
        return this.setState({ appointment: appointment });
    }
    render() {
        let appointment = this.props.appointment.currentAppointment;
        return (<div className={s.root}>
                <div className={cx("row", s.buttonsContainer)}>
                    <div className="col-md-3 pull-right">
                        <button className="btn btn-success btn-block">
                            <Glyphicon glyph="save"/> Save Opportunity
                        </button>
                    </div>
                    <div className="col-md-3 pull-left">
                        <button className="btn btn-default btn-block" onClick={this.backToOpportunityList}>
                            <Glyphicon glyph="menu-left"/> Back to opportunity list
                        </button>
                    </div>
                </div>

                
            </div>);
    }
}
EditOpportunity.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
    return {
        appointment: state.appointment
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getOpportunityById: bindActionCreators(getOpportunityById, dispatch),
        clearCurrentOpportunity: bindActionCreators(clearCurrentOpportunity, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditOpportunity);
//# sourceMappingURL=edit-opportunity.component.jsx.map