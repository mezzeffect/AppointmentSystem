import React from 'react'
import { Link } from 'react-router'
import { FieldGroup } from '../common/FieldGroup'
import { Button } from 'react-bootstrap'
import { Glyphicon, Pagination } from 'react-bootstrap'
import moment from 'moment'
import cx from 'classnames';
const s: any = require('./list.css')

type OpportunitiesListProps = {
    allItems: Array<any>,
    pageList: Array<any>,
    activePageNum: number,
    itemsPerPage: number,
    onPaginate: (event: any) => void,
    allItemsCount: number,
};

function getOneProperty(appointment) {
    return <tr>
        <td>{appointment.PatientFirstName}</td>
        <td>{appointment.PatientLastName}</td>
        <td>{moment(appointment.DateTime).format('MMMM Do YYYY')}</td>
        <td className="text-right">
            <Link className="btn btn-xs btn-primary" to={`/editopportunity/${appointment.AppointmentId}`} ><Glyphicon glyph="pencil" /> Edit</Link>
        </td>
    </tr>
}

export const OpportunitiesList: React.StatelessComponent<OpportunitiesListProps> =
    ({ allItems, pageList, itemsPerPage, activePageNum, onPaginate, allItemsCount }) => {
        debugger;
        return (
            <div>
                <div className="row">
                    <table className={cx("table", s.opportunityTable)}>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                        {pageList.map(getOneProperty)}
                    </table>
                </div>

                <div className={cx("row", s.tableFooter)}>
                    <div className="col-sm-8">
                        <Pagination
                            className={s.opportunitiesPagination}
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={allItemsCount % itemsPerPage > 0 ? Math.floor(allItemsCount / itemsPerPage) + 1 : allItemsCount / itemsPerPage}
                            maxButtons={5}
                            activePage={activePageNum}
                            onSelect={onPaginate} />
                    </div>
                    <div className={cx("col-sm-4 text-right")}>
                        <div className={s.total}>
                            Total number of <strong>{allItemsCount}</strong> opportunities
                        </div>
                    </div>
                </div>
            </div>
        );
    }

OpportunitiesList.propTypes = {
    allItems: React.PropTypes.array.isRequired,
    pageList: React.PropTypes.array.isRequired,
    activePageNum: React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    onPaginate: React.PropTypes.func.isRequired,
    allItemsCount: React.PropTypes.func.isRequired
};