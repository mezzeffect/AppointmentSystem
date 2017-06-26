import types from '../actions/actionTypes';

export interface UserState {
    isLoggedIn: boolean,
    user_id: string,
    display_name: string,
    email: string,
    access_token: string,
    errors: Object
}

const initialState: UserState = {
    isLoggedIn: false,
    user_id: null,
    display_name: null,
    email: null,
    access_token: null,
    errors: {}
};

export default function userReducer(state: UserState = initialState, action) {
    switch (action.type) {
        case types.REGISTER_USER_SUCCESS:
            return { ...state, ...action.data, errors: {} };
        case types.REGISTER_USER_FAILED:
            return { ...state, ...initialState, ...action.errors };
        case types.LOGIN_USER_DEFAULT_SUCCESS:
            return { ...state, ...action.data };
        case types.LOGIN_USER_DEFAULT_FAILED:
        case types.LOGOUT_SUCCESS:
            action.errors = action.errors || {};
            return { ...state, ...initialState, ...action.errors };

        default:
            return state;
    }
}