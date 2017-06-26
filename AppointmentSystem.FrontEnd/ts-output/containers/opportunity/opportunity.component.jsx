import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';
import { getAppointmentById as getOpportunityById, clearCurrentAppointment as clearCurrentOpportunity } from '../../actions';
const s = require('./opportunity.component.css');
class Opportunity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.backToOpportunityList = this.backToOpportunityList.bind(this);
        this.goToEditOpportunity = this.goToEditOpportunity.bind(this);
    }
    transitionTo(path) {
        let { router } = this.context;
        router.push(path);
    }
    backToOpportunityList() {
        this.transitionTo('/');
    }
    goToEditOpportunity() {
        this.transitionTo(`/editopportunity/${this.props.opportunity.currentOpportunity.id}`);
    }
    componentWillMount() {
        this.props.getOpportunityById(this.props.params.id);
    }
    componentWillUnmount() {
        this.props.clearCurrentOpportunity();
    }
    render() {
        let opportunity = this.props.opportunity.currentOpportunity;
        return (<div className={s.root}>
                <div className={cx("row", s.buttonsContainer)}>
                    <div className="col-md-3 pull-right">
                        <button className="btn btn-info btn-block" onClick={this.goToEditOpportunity}>
                            <Glyphicon glyph="pencil"/> Edit opportunity
                        </button>
                    </div>
                    <div className="col-md-3 pull-left">
                        <button className="btn btn-default btn-block" onClick={this.backToOpportunityList}>
                            <Glyphicon glyph="menu-left"/> Back to opportunity list
                        </button>
                    </div>
                </div>
                <div className={s.opportunityDetailsContainer}>
                    <div className={cx("row", s.heigherRow)}>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Name</div>
                                <div className={cx("col-sm-8", s.info)}>{opportunity.name}</div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Stage</div>
                                <div className={cx("col-sm-8", s.info)}>{opportunity.stageName}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("row", s.heigherRow)}>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Close Date</div>
                                <div className={cx("col-sm-8", s.info)}>{moment(opportunity.closeDate).format('MMMM DD, YYYY')}</div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Probability</div>
                                <div className={cx("col-sm-8", s.info)}>
                                    <div className="badge">
                                        {opportunity.probability} %
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("row", s.heigherRow)}>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Type</div>
                                <div className={cx("col-sm-8", s.info)}>{opportunity.type}</div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Owner</div>
                                <div className={cx("col-sm-8", s.info)}>{opportunity.ownerId}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("row", s.heigherRow)}>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Lead source</div>
                                <div className={cx("col-sm-8", s.info)}>{opportunity.leadSource}</div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className={cx("col-sm-4", s.label)}>Technologies</div>
                                <div className={cx("col-sm-8", s.info)}>{opportunity.technology}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
Opportunity.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
    return {
        appointment: state.opportunity
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getOpportunityById: bindActionCreators(getOpportunityById, dispatch),
        clearCurrentOpportunity: bindActionCreators(clearCurrentOpportunity, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
//# sourceMappingURL=opportunity.component.jsx.map