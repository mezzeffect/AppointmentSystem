var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import types from '../actions/actionTypes';
const initialState = {
    isLoggedIn: false,
    user_id: null,
    display_name: null,
    email: null,
    access_token: null,
    errors: {}
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER_USER_SUCCESS:
            return __assign({}, state, action.data, { errors: {} });
        case types.REGISTER_USER_FAILED:
            return __assign({}, state, initialState, action.errors);
        case types.LOGIN_USER_DEFAULT_SUCCESS:
            return __assign({}, state, action.data);
        case types.LOGIN_USER_DEFAULT_FAILED:
        case types.LOGOUT_SUCCESS:
            action.errors = action.errors || {};
            return __assign({}, state, initialState, action.errors);
        default:
            return state;
    }
}
//# sourceMappingURL=user.reducer.jsx.map