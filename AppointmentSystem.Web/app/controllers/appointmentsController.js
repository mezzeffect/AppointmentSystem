'use strict';
app.controller('appointmentsController', ['$scope', 'appointmentsService', 'authService', function ($scope, appointmentsService,authService) {

    $scope.appointments = [];
    $scope.message = "";
    $scope.currentAppointment = {};
    $scope.showEdit = false;
    $scope.isDoctor = false;
    $scope.isNurse = false;
    
    $scope.setCurrentAppointment = function (modify) {
        $scope.currentAppointment = modify;
        $scope.showEdit = true;
    };

    $scope.addNew = function() {
        $scope.resetCurrentAppointment();
        $scope.showEdit = true;
    };

    $scope.cancel = function() {
        $scope.showEdit = false;
        $scope.resetCurrentAppointment();
        $scope.message = "";
    };

    $scope.ApplyPermissions = function() {
        authService.getCurrentUser().then(function (results) {
            if (results.data.IsSuccessful) {
                if (results.data.CurrentUser.Role === 0) {
                    $scope.isDoctor = true;
                    
                } else {
                    $scope.isNurse = true;
                }
                console.log($scope.isDoctor);
                console.log($scope.isNurse);
            } else {
                $scope.message = results.data.ErrorMessage;
            }

        }, function (error) {
            $scope.message = error.data.message;
        });
    };
    $scope.resetCurrentAppointment = function() {
        $scope.currentAppointment = {
            AppointmentId: 0,
            PatientFirstName: "",
            PatientLastName: "",
            Gender: 0,
            DateTime: "",
            DoctorsComment: "",
            IsCompleted: false,
            UserId: ""
        };
    };

    $scope.saveClick = function() {
        appointmentsService.saveAppointment($scope.currentAppointment).then(function (results) {
            if (results.data.IsSuccessful) {
                $scope.appointments = results.data.Appointments;
                $scope.cancel();
            } else {
                $scope.message = results.data.ErrorMessage;
            }

        }, function (error) {
            $scope.message = error.data.message;
        });
    };
    $scope.delete = function(deleted) {
        appointmentsService.deleteAppointment(deleted).then(function (results) {
            if (results.data.IsSuccessful) {
                $scope.appointments = results.data.Appointments;
                $scope.cancel();
            } else {
                $scope.message = results.data.ErrorMessage;
            }

        }, function (error) {
            $scope.message = error.data.message;
        });
    };
    appointmentsService.getAppointments().then(function (results) {
        if (results.data.IsSuccessful) {
            $scope.appointments = results.data.Appointments;
            $scope.ApplyPermissions();
        } else {
            $scope.message = results.data.ErrorMessage;
        }
        
    }, function (error) {
        $scope.message = error.data.message;
    });

}]);