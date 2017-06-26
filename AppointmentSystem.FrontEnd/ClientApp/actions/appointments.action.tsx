import types from './actionTypes';
import { AppointmentApi } from '../api';

export function getAppointmentsSuccess(data,count) {
    return { type: types.GET_APPOINTMENTS_SUCCESS, data: data,count:count }
}

export function unAuthorizedAction() {
    return { type: types.LOGOUT_SUCCESS }
}

export function getAppointmentByIdSuccess(data) {
    return { type: types.GET_APPOINTMENT_BY_ID_SUCCESS, data: data }
}

export function getAppointmentByIdFailed() {
    return { type: types.GET_APPOINTMENT_BY_ID_FAILED }
}

export function clearCurrentAppointment() {
    return { type: types.GET_APPOINTMENT_BY_ID_FAILED }
}

export function getAppointmentsList(pageNumber = 0, pageSize = 0) {
    return function (dispatch, getState) {
        return AppointmentApi.getAppointments()
            .then(response => {
                if (response) {
                    debugger;    
                    let result = response.data;
                    if (result && result.IsSuccessful) {
                        debugger;
                        dispatch(getAppointmentsSuccess(result, result.Appointments.length));
                    }
                } else {
                    dispatch(unAuthorizedAction());
                    // window.location.href = '/login';
                }
            }).catch(error => {
                // window.location.href = '/login';
                throw (error);
            });
    }
}

export function getAppointmentById(id) {
    return function (dispatch, getState) {
        return AppointmentApi.getAppointmentById(id)
            .then(response => {
                if (response) {
                    let result = response.data;
                    if (result && result.success) {
                        dispatch(getAppointmentByIdSuccess(result.data));
                    }
                } else {
                    dispatch(getAppointmentByIdFailed());
                }
            }).catch(error => {
                throw (error);
            });
    }
}