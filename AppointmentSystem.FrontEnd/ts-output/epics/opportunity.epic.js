import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';
import { OpportunityApi } from '../api/opportunity.api';
import { filterOpportunitiesSuccess, updateOpportunitySuccess, getOpportunityByIdSuccess, getOpportunityByIdFailed, getOpportunitiesSuccess } from '../actions/opportunity.action';
import { actionTypes } from '../actions/opportunity.action.types';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { serverError } from '../actions/global.actions';
import { checkServerResponse } from './epic.utilities';
const getOpportunitiesEpic = (action$) => action$
    .ofType(actionTypes.GET_OPPORTUNITIES)
    .map(action => action.payload || {})
    .mergeMap((payload) => {
    return from(OpportunityApi.getOpportunities(payload.pageNumber, payload.pageSize))
        .map(response => response.data)
        .let(checkServerResponse)
        .map((response) => getOpportunitiesSuccess({
        count: response.data.totalSize,
        data: response.data.opportunities
    }))
        .catch((error) => of(serverError(error)));
});
const getOpportunityByIdEpic = (action$) => action$
    .ofType(actionTypes.GET_OPPORTUNITY_BY_ID)
    .map(action => action.payload)
    .mergeMap((payload) => {
    return from(OpportunityApi.getOpportunityById(payload))
        .map(response => response.data)
        .let(checkServerResponse)
        .map((response) => getOpportunityByIdSuccess(response.data))
        .catch((error) => of(getOpportunityByIdFailed(error)));
});
const filterOpportunitiesEpic = (action$) => action$
    .ofType(actionTypes.Filter_OPPORTUNITIES)
    .map(action => action.payload)
    .mergeMap((payload) => {
    return from(OpportunityApi.searchOpportunities(payload))
        .map(response => response.data)
        .let(checkServerResponse)
        .map(response => response.data)
        .map((data) => filterOpportunitiesSuccess({
        opportunities: data.opportunities,
        totalSize: data.totalSize
    }))
        .catch((error) => of(serverError(error)));
});
const updateOpportunityEpic = (action$) => action$
    .ofType(actionTypes.UPDATE_OPPORTUNITY)
    .map(action => action.payload)
    .mergeMap((payload) => {
    return from(OpportunityApi.updateOpportunity(payload))
        .map(response => response.data)
        .let(checkServerResponse)
        .map((data) => updateOpportunitySuccess(data))
        .catch((error) => of(serverError(error)));
});
const updateOpportunitySuccessEpic = (action$) => action$
    .ofType(actionTypes.UPDATE_OPPORTUNITY_SUCCESS)
    .mapTo(push('/'));
export default combineEpics(updateOpportunityEpic, updateOpportunitySuccessEpic, filterOpportunitiesEpic, getOpportunityByIdEpic, getOpportunitiesEpic);
//# sourceMappingURL=opportunity.epic.js.map