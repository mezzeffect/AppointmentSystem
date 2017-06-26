import types from '../actions/actionTypes';

export interface AppointmentState {
    appointments: Array<any>,
    count: number,
    currentAppointment: {
        id: string,
        name: string,
        stageName: string,
        closeDate: string,
        leadSource: string,
        propability: string,
        ownerId: string,
        type: string,
        technology: Array<any>
    }
}

const initialState: AppointmentState = {
    appointments: [],
    count:0,
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

export default function appointmentReducer(state: AppointmentState = initialState, action) {
    switch (action.type) {
        case types.GET_APPOINTMENTS_SUCCESS:
            let opportunities = action.data;
            let count = action.count;
            debugger;
            return { ...state, appointments: opportunities, count: count };
        case types.GET_APPOINTMENT_BY_ID_SUCCESS:
            return { ...state, currentOpportunity: action.data };
        case types.GET_APPOINTMENT_BY_ID_FAILED:
            return { ...state, currentAppointment: initialState.currentAppointment };

        default:
            return state;
    }
}