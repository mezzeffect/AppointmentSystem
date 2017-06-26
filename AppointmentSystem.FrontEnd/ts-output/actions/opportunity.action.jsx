import types from './actionTypes';
import { AppointmentApi } from '../api';
export function getOpportunitiesSuccess(data, count) {
    return { type: types.GET_OPPORTUNITIES_SUCCESS, data: data, count: count };
}
export function unAuthorizedAction() {
    return { type: types.LOGOUT_SUCCESS };
}
export function getOpportunityByIdSuccess(data) {
    return { type: types.GET_OPPORTUNITY_BY_ID_SUCCESS, data: data };
}
export function getOpportunityByIdFailed() {
    return { type: types.GET_OPPORTUNITY_BY_ID_FAILED };
}
export function clearCurrentOpportunity() {
    return { type: types.GET_OPPORTUNITY_BY_ID_FAILED };
}
export function getOpportunitiesList(pageNumber = 0, pageSize = 0) {
    return function (dispatch, getState) {
        return AppointmentApi.getOpportunities()
            .then(response => {
            if (response) {
                let result = response.data;
                if (result && result.success) {
                    debugger;
                    dispatch(getOpportunitiesSuccess(result.data, result.count));
                }
            }
            else {
                dispatch(unAuthorizedAction());
            }
        }).catch(error => {
            // window.location.href = '/login';
            throw (error);
        });
    };
}
export function getOpportunityById(id) {
    return function (dispatch, getState) {
        return AppointmentApi.getOpportunityById(id)
            .then(response => {
            if (response) {
                let result = response.data;
                if (result && result.success) {
                    dispatch(getOpportunityByIdSuccess(result.data));
                }
            }
            else {
                dispatch(getOpportunityByIdFailed());
            }
        }).catch(error => {
            throw (error);
        });
    };
}
//# sourceMappingURL=opportunity.action.jsx.map