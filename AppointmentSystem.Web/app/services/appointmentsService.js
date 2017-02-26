'use strict';
app.factory('appointmentsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var appointmentsServiceFactory = {};

    var _getAppointments = function () {

        return $http.get(serviceBase + 'api/appointments').then(function (results) {
            return results;
        });
    };
    var _saveAppointment = function(modified) {
        return $http.post(serviceBase + 'api/appointments',modified, { headers: { 'Content-Type': 'application/json' } }).then(function (results) {
            return results;
        });
    }

    var _deleteAppointment = function (deleted) {
        return $http.delete(serviceBase + 'api/appointments'+'?id='+deleted.AppointmentId, { headers: { 'Content-Type': 'application/json' } }).then(function (results) {
            return results;
        });
    }
    appointmentsServiceFactory.getAppointments = _getAppointments;
    appointmentsServiceFactory.saveAppointment = _saveAppointment;
    appointmentsServiceFactory.deleteAppointment = _deleteAppointment;

    return appointmentsServiceFactory;

}]);