import { actionTypes } from './opportunity.action.types';
export function clearCurrentOpportunity() {
    return { type: actionTypes.GET_OPPORTUNITY_BY_ID_FAILED };
}
export function getOpportunitiesList(payload) {
    return { type: actionTypes.GET_OPPORTUNITIES, payload };
}
export function getOpportunitiesSuccess(payload) {
    return { type: actionTypes.GET_OPPORTUNITIES_SUCCESS, payload };
}
export function getOpportunityById(payload) {
    return { type: actionTypes.GET_OPPORTUNITY_BY_ID, payload };
}
export function getOpportunityByIdSuccess(payload) {
    return { type: actionTypes.GET_OPPORTUNITY_BY_ID_SUCCESS, payload };
}
export function getOpportunityByIdFailed(payload) {
    return { type: actionTypes.GET_OPPORTUNITY_BY_ID_FAILED, payload };
}
export function filterOpportunities(payload) {
    return { type: actionTypes.Filter_OPPORTUNITIES, payload };
}
export function filterOpportunitiesSuccess(payload) {
    return { type: actionTypes.Filter_OPPORTUNITIES_SUCCESS, payload };
}
export function updateOpportunity(payload) {
    return { type: actionTypes.UPDATE_OPPORTUNITY, payload };
}
export function updateOpportunitySuccess(payload) {
    return { type: actionTypes.UPDATE_OPPORTUNITY_SUCCESS, payload };
}
export function getTechnologiesList() {
    return { type: actionTypes.GET_TECHNOLOGIES };
}
export function getTechnologiesSuccess(payload) {
    return { type: actionTypes.GET_TECHNOLOGIES_SUCCESS, payload };
}
//# sourceMappingURL=opportunity.action.js.map