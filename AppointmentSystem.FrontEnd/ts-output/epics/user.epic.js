import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';
import ActionTypes from '../actions/actionTypes';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import { logoutUserSuccess } from '../actions/user.action';
const loginUserSuccessEpic = (action$) => action$
    .ofType(ActionTypes.LOGIN_USER_DEFAULT_SUCCESS)
    .map(action => action.payload)
    .let(persistUserData)
    .mapTo(push('/'));
const loginOutUserEpic = (action$) => action$
    .ofType(ActionTypes.LOGOUT)
    .let(clearUserData)
    .mapTo(logoutUserSuccess());
const loginOutUserSuccessEpic = (action$) => action$
    .ofType(ActionTypes.LOGOUT_SUCCESS)
    .mapTo(push('/login'));
const persistUserData = (obs) => {
    return obs.do(data => {
        localStorage.setItem('user_info', JSON.stringify(data));
    });
};
const clearUserData = (obs) => {
    return obs.do(data => {
        localStorage.removeItem('user_info');
    });
};
export default combineEpics(loginUserSuccessEpic, loginOutUserSuccessEpic, loginOutUserEpic);
//# sourceMappingURL=user.epic.js.map