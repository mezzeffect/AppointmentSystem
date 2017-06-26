import types from './actionTypes';
import { UserApi } from '../api';

function addLoginFlagAndTokenToPayload(payload) {
    let data = Object.assign({}, payload);
    data.isLoggedIn = true;
    data.access_token = data.token_type + ' ' + data.access_token;
    return data;
}

export function authenticateUserSuccess(userData) {
    debugger;
    let data = addLoginFlagAndTokenToPayload(userData);
    return { type: types.LOGIN_USER_DEFAULT_SUCCESS, data };
}

export function authenticateUserFailed(error) {
    let errors = {
        'errors': error
    }
    return { type: types.LOGIN_USER_DEFAULT_FAILED, errors };
}

export function registerUserSuccess(userData) {
    let data = addLoginFlagAndTokenToPayload(userData);
    return { type: types.REGISTER_USER_SUCCESS, data };
}

export function registerUserFailed(error) {
    let errors = {
        'errors': error
    }
    return { type: types.REGISTER_USER_FAILED, errors };
}

export function logoutUser() {
    return { type: types.LOGOUT_SUCCESS }
}

export function loginWithSalesforce() {
    return function (dispatch, getState) {
        return UserApi.loginWithSalesForce()
            .then(response => {
                let result = response.data;
                debugger;
                if (result && result.access_token) {
                    dispatch(authenticateUserSuccess(result.data));
                    window.location.href = result.data.external_login_url;
                } else {
                    dispatch(authenticateUserFailed(result.errors));
                }
            }).catch(error => {
                throw (error);
            });
    }
}


export function salesforceCallBack(query) {
    return function (dispatch, getState) {
        return UserApi.salesforceCallback(query)
            .then(response => {
                let result = response.data;
                if (result && result.success) {
                    dispatch(authenticateUserSuccess(result.data));
                } else {
                    dispatch(authenticateUserFailed(result.errors));
                }
            }).catch(error => {
                throw (error);
            });
    }
}

export function authenticateUser(userdata) {
    return function (dispatch, getState) {
        return UserApi.loginUser(userdata.email, userdata.password)
            .then(response => {
                let result = response.data;
                debugger;
                if (result && result.access_token) {
                    dispatch(authenticateUserSuccess(result));
                } else {
                    dispatch(authenticateUserFailed(result.errors));
                }
            }).catch(error => {
                throw (error);
            });
    }
}

export function registerNewUser(userdata) {
    return function (dispatch, getState) {
        return UserApi.registerUser(userdata)
            .then(response => {
                let result = response.data;
                if (result && result.success) {
                    dispatch(registerUserSuccess(result.data));
                } else {
                    dispatch(registerUserFailed(result.errors));
                }
            }).catch(error => {
                throw (error);
            });
    }
}