import axios from 'axios';
export class AppointmentApi {
    static getAppointments(pageNumber = 0, pageSize = 0) {
        return axios.get('/api/appointments');
    }
    static getAppointmentById(id) {
        return axios.post('/api/appointments', {
            'id': id
        });
    }
}
//# sourceMappingURL=appointment.api.jsx.map