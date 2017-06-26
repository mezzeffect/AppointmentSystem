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
    opportunities: [],
    count: 0,
    currentOpportunity: {
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
export default function opportunityReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_OPPORTUNITIES_SUCCESS:
            let opportunities = action.data;
            let count = action.count;
            debugger;
            return __assign({}, state, { opportunities: opportunities, count: count });
        case types.GET_OPPORTUNITY_BY_ID_SUCCESS:
            return __assign({}, state, { currentOpportunity: action.data });
        case types.GET_OPPORTUNITY_BY_ID_FAILED:
            return __assign({}, state, { currentOpportunity: initialState.currentOpportunity });
        default:
            return state;
    }
}
//# sourceMappingURL=opportunity.reducer.jsx.map