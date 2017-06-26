import { combineEpics } from 'redux-observable';
import { actionTypes } from '../actions/opportunity.action.types';
import { TechnologyApi } from '../api/technology.api';
import { from } from 'rxjs/observable/from';
import { checkServerResponse } from './epic.utilities';
import { getTechnologiesSuccess, getTechnologiesList } from '../actions/opportunity.action';
import { of } from 'rxjs/observable/of';
import { serverError } from '../actions/global.actions';
import { LOCATION_CHANGE } from 'react-router-redux';
const getTechnologiesEpic = (action$) => action$
    .ofType(actionTypes.GET_TECHNOLOGIES)
    .mergeMap(() => {
    return from(TechnologyApi.getTechnologies())
        .map(response => response.data)
        .let(checkServerResponse)
        .map((response) => getTechnologiesSuccess(response.data))
        .catch((error) => of(serverError(error)));
});
const loadTechnologiesOnEditOrAddOpportunity = (action$) => action$
    .ofType(LOCATION_CHANGE)
    .map(action => action.payload)
    .map(payload => payload.pathname)
    .filter(pathname => Boolean(pathname))
    .filter(pathname => pathname.includes('editopportunity') || pathname.includes('addopportunity'))
    .mapTo(getTechnologiesList());
export default combineEpics(getTechnologiesEpic, loadTechnologiesOnEditOrAddOpportunity);
//# sourceMappingURL=technology.epic.js.map