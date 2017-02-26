using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AppointmentSystem.Common;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces;
using AppointmentSystem.Interfaces.Business;
using AppointmentSystem.Interfaces.Repository;

namespace AppointmentSystem.Business
{
    public interface IAppointmentServiceManager : IBusinessManager<Appointment>
    {
        GetAppointmentsResponce GetCurrentUserAppointments(string username);
        BaseResponse SaveAppointmentByUserName(string username,Appointment appointment);
        BaseResponse DeleteByUserName(int id, string username);
    }

    public class AppointmentServiceManager : IAppointmentServiceManager
    {
        #region P R I V A T E
        
        private readonly IEntityRepository<Appointment> _appointmentRepository; 
        private readonly IEntityRepository<User> _userRepository; 
        
        #endregion

        #region C O N S T R U C T O R S
        
        public AppointmentServiceManager(IEntityRepository<Appointment> appointmentRepository, IEntityRepository<User> userRepository)
        {
            _appointmentRepository = appointmentRepository;
            _userRepository = userRepository;
        } 
        
        #endregion

        #region I  A P P O I N T M E N T  B U S I N E S S  M A N A G E R  M E M B E R S

        public Appointment Find(int id)
        {
            try
            {
                return _appointmentRepository.GetById(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool Add(Appointment entity)
        {
            try
            {
                _appointmentRepository.Add(entity);
                _appointmentRepository.SubmitChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<Appointment> All()
        {
            try
            {
                return _appointmentRepository.All();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool Remove(Appointment entity)
        {
            try
            {
                _appointmentRepository.Delete(entity);
                _appointmentRepository.SubmitChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Update(Appointment entity)
        {
            try
            {
                _appointmentRepository.Update(entity);
                _appointmentRepository.SubmitChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }



        #endregion

        #region I  A P P O I N T M E N T  S E R V I C E  M A N A G E R  M E M B E R S
     

        public BaseResponse SaveAppointmentByUserName(string username,Appointment appointment)
        {
            var user = _userRepository.All().FirstOrDefault(u => u.UserName == username);
            var error = string.Empty;
            if (user!=null)
            {
                if (user.Role == UserRole.Doctor)
                {
                    error = CheckDoctorBussinesValidations(appointment);
                    if (string.IsNullOrEmpty(error))
                    {
                        _appointmentRepository.Update(appointment);
                        _appointmentRepository.SubmitChanges();
                        return new BaseResponse() {IsSuccessful = true};
                    }
                }
                error = CheckNurseBusinessValidations(appointment);
                if (string.IsNullOrEmpty(error))
                {
                    if (appointment.AppointmentId == 0)
                    {
                        _appointmentRepository.Add(appointment);
                    }
                    else
                    {
                        _appointmentRepository.Update(appointment);
                    }
                    _appointmentRepository.SubmitChanges();
                    return new BaseResponse() {IsSuccessful = true};
                }
            }
            return new BaseResponse() { IsSuccessful = false, ErrorMessage = error };
        }

        public BaseResponse DeleteByUserName(int id, string username)
        {
            var user =  _userRepository.All().FirstOrDefault(u => u.UserName == username);
            var error = string.Empty;
            if (user != null)
            {
                var appointment = _appointmentRepository.GetById(id);
                if (user.Role != UserRole.Nurse || !appointment.IsCompleted)
                {
                    error = "Unauthorized:Appointment needs to be completed before deletion";
                }
                else
                {
                    _appointmentRepository.Delete(appointment);
                    _appointmentRepository.SubmitChanges();
                    return new BaseResponse() { IsSuccessful = true };
                }
            }
            return new BaseResponse() { IsSuccessful = false, ErrorMessage = error };
        }

        public GetAppointmentsResponce GetCurrentUserAppointments(string username)
        {
            var user = _userRepository.All().FirstOrDefault(u => u.UserName == username);
            if (user != null)
            {
                if (user.Role == UserRole.Doctor)
                {
                    var list = _appointmentRepository.All().Where(a => a.UserId == user.UserId);
                    return new GetAppointmentsResponce() {IsSuccessful = true,Appointments = list};
                }
                else
                {
                    return new GetAppointmentsResponce() {IsSuccessful = true,Appointments = _appointmentRepository.All()};
                }
            }
            return new GetAppointmentsResponce() {IsSuccessful = false, ErrorMessage = "Unknow error"};
        }
        #endregion

        #region P R I V A T E  M E T H O D S
        private string CheckNurseBusinessValidations(Appointment appointment)
        {
            if (appointment.AppointmentId == 0)
            {
                if (appointment.IsCompleted || !string.IsNullOrEmpty(appointment.DoctorsComment))
                {
                    return "Unauthorized: Unable to modify fields";
                }
            }
            else
            {
                var oldAppointment = _appointmentRepository.GetById(appointment.AppointmentId);
                if (appointment.IsCompleted != oldAppointment.IsCompleted ||
                    appointment.DoctorsComment != oldAppointment.DoctorsComment)
                {
                    return "Unauthorized: Unable to modify fields";
                }
            }
            if (appointment.DateTime - DateTime.Now > TimeSpan.FromDays(7))
            {
                return "Error: Datatime can only be maximum 7 days in the past";
            }
            return string.Empty;
        }

        private string CheckDoctorBussinesValidations(Appointment newAppointmet)
        {
            if (newAppointmet.AppointmentId == 0)
            {
                return "Unauthorized: Doctors Cannot Create New Appointments";
            }
            var oldappointment = _appointmentRepository.GetById(newAppointmet.AppointmentId);
            if (newAppointmet.PatientFirstName != oldappointment.PatientFirstName ||
                newAppointmet.PatientLastName != oldappointment.PatientLastName ||
                newAppointmet.DateTime != oldappointment.DateTime ||
                newAppointmet.Gender != oldappointment.Gender)
            {
                return "Unauthorized: Unable to modify fields";
            }
            if (!newAppointmet.IsCompleted || string.IsNullOrEmpty(newAppointmet.DoctorsComment))
            {
                return "Error: Is Competed and Doctor's Comment Must be Modified";
            }
            return string.Empty;
        }
        #endregion


    }
}
