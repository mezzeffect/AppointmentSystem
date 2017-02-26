using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Data;
using AppointmentSystem.Interfaces.Repository;

namespace AppointmentSystem.Repository
{
    public class AppointmentRepository:IEntityRepository<Appointment>
    {
        #region P R I V A T E

        private readonly IAppointmentSystemDataContext _appointmentSystemDataContext; 

        #endregion

        #region I  E N T I T Y  R E P O S I T O R Y
        public AppointmentRepository(IAppointmentSystemDataContext appointmentSystemDataContext)
        {
            _appointmentSystemDataContext = appointmentSystemDataContext;
        }
        public Appointment GetById(int? id)
        {
            return _appointmentSystemDataContext.Appointments.Find(id);
        }

        public void Add(Appointment entity)
        {
            _appointmentSystemDataContext.Appointments.Add(entity);
        }

        public void Delete(Appointment entity)
        {
            _appointmentSystemDataContext.Appointments.Remove(entity);
        }

        public void Update(Appointment entity)
        {
            var appointment = _appointmentSystemDataContext.Appointments.Find(entity.AppointmentId);
            appointment.UserId = entity.UserId;
            appointment.DateTime = entity.DateTime;
            appointment.DoctorsComment = entity.DoctorsComment;
            appointment.IsCompleted = entity.IsCompleted;
            appointment.Gender = entity.Gender;
            appointment.PatientLastName = entity.PatientLastName;
            appointment.PatientFirstName = entity.PatientFirstName;
            appointment.PatientFirstName = entity.PatientFirstName;
        }

        public List<Appointment> All()
        {
            return _appointmentSystemDataContext.Appointments.ToList();
        }

        public void SubmitChanges()
        {
            _appointmentSystemDataContext.SaveChanges();
        } 
        #endregion
    }
}
