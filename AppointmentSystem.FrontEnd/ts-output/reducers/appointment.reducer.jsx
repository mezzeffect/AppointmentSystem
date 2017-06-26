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
    appointments: [],
    count: 0,
    currentAppointment: {
        id: "",
        name: "",
        stageName: "",
        closeDate: "",
        leadSource: "",
        propability: "",
        ownerId: "",
        type: "",
        technology: []
    }
};
export default function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_APPOINTMENTS_SUCCESS:
            let opportunities = action.data;
            let count = action.count;
            debugger;
            return __assign({}, state, { appointments: opportunities, count: count });
        case types.GET_APPOINTMENT_BY_ID_SUCCESS:
            return __assign({}, state, { currentOpportunity: action.data });
        case types.GET_APPOINTMENT_BY_ID_FAILED:
            return __assign({}, state, { currentAppointment: initialState.currentAppointment });
        default:
            return state;
    }
}
//# sourceMappingURL=appointment.reducer.jsx.map