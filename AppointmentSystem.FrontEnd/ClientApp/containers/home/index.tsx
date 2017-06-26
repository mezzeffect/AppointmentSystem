import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Glyphicon } from 'react-bootstrap'
import { getAppointmentsList as getAppointmentsList } from '../../actions'
import { FilterForm } from '../../components/filter'
import { OpportunitiesList } from '../../components/appointmentList'
import { Header } from '../../components/header'
import cx from 'classnames'
const s: any = require('./styles.css')

class HomePage extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.updateSearchState = this.updateSearchState.bind(this);

        this.state = {
            activePage: 1,
            itemsPerPage: 10,
            allItems: [],
            allItemsCount:0,
            filteredList: [],
            currentList: [],
            search: {
                appointment: null,
                stage: null,
                closeDate: null
            }
        }
    }

    componentDidMount() {
        setTimeout((function () {
            this.props.getAppointmentsList();
            this.setState({ activePage: 1, allItems: this.props.appointment.appointments.Appointments, allItemsCount : this.props.allItemsCount });
            debugger;
        }).bind(this), 1000);
    }

    componentWillReceiveProps() {
        this.setState({
            currentList: this.state.allItems
    });
    }

    applyFilter() {
        this.state.filteredList = this.state.allItems.filter((item) => {
            let { opportunity, stage, closeDate } = this.state.search;
            return item.name == opportunity || item.stageName == stage || item.closeDate == closeDate;
        });
        debugger;
    }

    updateSearchState(event) {
        const field = event.target.name;
        let search = this.state.search;
        search[field] = event.target.value;
        return this.setState({ user: search });
    }

    handleSelect(eventKey) {
        let startPoint = (eventKey - 1) * this.state.itemsPerPage;
        this.setState({
            activePage: eventKey,
            currentList: this.props.appointment.appointments.getAppointments(this.state.activePage, this.state.itemsPerPage)
        });
    }

    render() {
        let allItems = this.props.appointment.appointments.Appointments;
        let allItemsCount = this.props.allItemsCount;
        debugger;
        return (
            <div>
               
                
                <Header />

                <FilterForm
                    onChange={this.updateSearchState}
                    onFilter={this.applyFilter}
                    search={this.state.search} />

                <OpportunitiesList
                    activePageNum={this.state.activePage}
                    allItems={this.state.allItems}
                    itemsPerPage={this.state.itemsPerPage}
                    pageList={this.state.currentList}
                    onPaginate={this.handleSelect}
                    allItemsCount = {this.state.allItemsCount}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    debugger;
    return {
        appointment: state.appointment,
        allItemsCount: state.appointment.count
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAppointmentsList: bindActionCreators(getAppointmentsList, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);